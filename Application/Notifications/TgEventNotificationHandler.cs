using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Notifications
{
    public class TgEventNotificationHandler
    {
        private readonly TelegramNotificationService _telegram;
        private readonly IChatRepository _chats;

        public TgEventNotificationHandler(TelegramNotificationService telegram, IChatRepository chats)
        {
            _telegram = telegram;
            _chats = chats;
        }

        public async Task OnEventCreatedOrUpdated(string title, string type)
        {
            var chats = await _chats.ListAsync();

            var tasks = chats.Select(async chat =>
            {
                try
                {
                    await _telegram.SendTelegramAsync(chat.ChatId, $"{type} {title} создано!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Ошибка при отправке пользователю {chat.ChatId}: {ex.Message}");
                }
            });

            await Task.WhenAll(tasks);
        }
    }
