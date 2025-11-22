using Domain.Entities;

namespace Infrastructure.DAL.Repository.Abstractions
{
    public interface IChatRepository : IRepository<Chat>
    {
        Task<Chat> GetByChatId(string id);
        Task<Chat?> GetByPhoneNumber(string phoneNumber);
        Task UpdateAsync(Chat chat);
        Task SetAwaitingPhoneAsync(string chatId, bool awaiting);
        Task LinkPhoneToChatAsync(string chatId, string phoneNumber);
    }
}
