using System.Text.RegularExpressions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;
using Telegram.Bot;
using Telegram.Bot.Requests;
using Telegram.Bot.Types.Enums;

public class TelegramMessageHandler
{
    private readonly IChatRepository _chatsRepository;
    private readonly ITelegramBotClient _botClient;

    public TelegramMessageHandler(IChatRepository chatsRepository, ITelegramBotClient botClient)
    {
        _chatsRepository = chatsRepository;
        _botClient = botClient;
    }

    public async Task HandleUpdateAsync(long chatId, string messageText, CancellationToken ct = default)
    {
        var chatIdStr = chatId.ToString();
        var chat = await _chatsRepository.GetByChatId(chatIdStr);

        if (chat == null)
        {
            chat = new Chat 
            { 
                Id = Guid.NewGuid(), 
                ChatId = chatIdStr
            };
            await _chatsRepository.AddAsync(chat);
        }

        var text = messageText?.Trim() ?? "";

        if (string.Equals(text, "Старт", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(text, "/start", StringComparison.OrdinalIgnoreCase))
        {
            // просим ввести номер телефона
            await _botClient.SendRequest(new SendMessageRequest
            {
                ChatId = chatIdStr,
                Text = "Введите номер телефона, привязанный к вашему читальному билету",
                ParseMode = ParseMode.Html
            }, ct);

            await _chatsRepository.SetAwaitingPhoneAsync(chatIdStr, true);
            return;
        }

        // Если мы ожидаем телефон — пытаемся принять телефон
        if (chat.IsAwaitingPhone)
        {
            var normalized = NormalizePhone(text);
            if (IsValidPhone(normalized))
            {
                await _chatsRepository.LinkPhoneToChatAsync(chatIdStr, normalized);

                await _botClient.SendRequest(new SendMessageRequest
                {
                    ChatId = chatIdStr,
                    Text = "Спасибо! Номер привязан. Теперь вы будете получать уведомления.",
                    ParseMode = ParseMode.Html
                }, ct);
            }
            else
            {
                await _botClient.SendRequest(new SendMessageRequest
                {
                    ChatId = chatIdStr,
                    Text = "Неверный формат номера. Введите только цифры или в формате +71234567890.",
                    ParseMode = ParseMode.Html
                }, ct);
            }
            return;
        }

        // Другие сообщения — игнорировать или обработать как нужно
    }

    private static string NormalizePhone(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input ?? "";
        var digits = new string(input.Where(char.IsDigit).ToArray());
        if (input.StartsWith("+") && !digits.StartsWith("00") && !digits.StartsWith("+"))
        {
            // оставляем плюс-формат отдельно (в БД можно хранить с плюсом)
            return "+" + digits;
        }
        return digits;
    }

    private static bool IsValidPhone(string phone)
    {
        if (string.IsNullOrEmpty(phone))
            return false;
        // разрешаем + и 9..15 цифр
        var p = phone.StartsWith("+") ? phone.Substring(1) : phone;
        return p.Length >= 9 && p.Length <= 15 && p.All(char.IsDigit);
    }
}
