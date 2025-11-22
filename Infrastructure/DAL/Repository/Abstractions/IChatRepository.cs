using Domain.Entities;

namespace Infrastructure.DAL.Repository.Abstractions
{
    public interface IChatRepository : IRepository<Chat>
    {
        public Task<Chat> GetByChatId(string id);
    }
}
