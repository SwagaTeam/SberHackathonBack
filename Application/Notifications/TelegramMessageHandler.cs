using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Notifications;

public class TelegramMessageHandler
{
    private readonly IChatRepository _chatsRepository;

    public TelegramMessageHandler(IChatRepository chatsRepository)
    {
        _chatsRepository = chatsRepository;
    }

    public async Task HandleStartCommand(long chatId)
    {
        var existing = await _chatsRepository.GetByChatId(chatId.ToString());
        if (existing == null)
        {
            await _chatsRepository.AddAsync(new Chat
            {
                Id = Guid.NewGuid(),
                ChatId = chatId.ToString()
            });
        }
    }
}