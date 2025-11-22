using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DAL.Repository.Implementations
{
    public class ChatRepository(AppDbContext db) : GenericRepository<Chat>(db), IChatRepository
    {
        public async Task<Chat> GetByChatId(string id)
        {
            return await db.Chats.FirstOrDefaultAsync(x => x.ChatId == id);
        }

        public async Task<Chat?> GetByPhoneNumber(string phoneNumber)
        {
            return await db.Chats.FirstOrDefaultAsync(c => c.PhoneNumber == phoneNumber);
        }
        

        public async Task UpdateAsync(Chat chat)
        {
            db.Chats.Update(chat);
            await db.SaveChangesAsync();
        }

        public async Task SetAwaitingPhoneAsync(string chatId, bool awaiting)
        {
            var chat = await GetByChatId(chatId);
            if (chat is null)
                return;
            chat.IsAwaitingPhone = awaiting;
            await UpdateAsync(chat);
        }

        public async Task LinkPhoneToChatAsync(string chatId, string phoneNumber)
        {
            var chat = await GetByChatId(chatId);
            if (chat is null)
                return;
            chat.PhoneNumber = phoneNumber;
            chat.IsAwaitingPhone = false;
            await UpdateAsync(chat);
        }
    }
}
