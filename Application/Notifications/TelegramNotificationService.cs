using Application.Services.Abstractions;
using Infrastructure.DAL.Repository.Abstractions;
using Telegram.Bot;
using Telegram.Bot.Requests;
using Telegram.Bot.Types.Enums;

namespace Application.Notifications
{
    public class TelegramNotificationService : INotificationService
    {
        private readonly ITelegramBotClient _botClient;
        private readonly string? _defaultChatId;
        private readonly IChatRepository _chatRepository;

        public TelegramNotificationService(ITelegramBotClient botClient, IChatRepository chatRepository, string? defaultChatId)
        {
            _botClient = botClient;
            _chatRepository = chatRepository;
            _defaultChatId = defaultChatId;
        }

        public async Task SendTelegramAsync(string chatId, string message)
        {
            var cid = string.IsNullOrEmpty(chatId) ? _defaultChatId : chatId;
            if (string.IsNullOrEmpty(cid))
                return;

            try
            {
                var req = new SendMessageRequest
                {
                    ParseMode = ParseMode.Html,
                    ChatId = cid,
                    Text = message
                };
                await _botClient.SendRequest(req);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"SendTelegramAsync failed for {cid}: {ex.Message}");
            }
        }

        public async Task SendTelegramToPhoneAsync(string phoneNumber, string message)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                return;
            var normalized = NormalizePhone(phoneNumber);
            var chat = await _chatRepository.GetByPhoneNumber(normalized);
            if (chat == null)
            {
                Console.WriteLine($"No chat linked to phone {normalized}");
                return;
            }

            await SendTelegramAsync(chat.ChatId, message);
        }

        private static string NormalizePhone(string input)
        {
            var digits = new string((input??"").Where(char.IsDigit).ToArray());
            return "+" + digits; // предполагаем хранение в формате +{digits}
        }

        public Task SendPushAsync(Guid userId, string title, string body) => Task.CompletedTask;
    }
}
