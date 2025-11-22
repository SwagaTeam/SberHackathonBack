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
    }
}
