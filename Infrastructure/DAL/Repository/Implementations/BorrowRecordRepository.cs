using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Infrastructure.DAL.Repository.Implementations;

public class BorrowRecordRepository(AppDbContext db) : GenericRepository<BorrowRecord>(db), IBorrowRecordRepository
{
    public async Task<IEnumerable<BorrowRecord>> GetByUserId(Guid userId)
    {
        return await ListAsync(x => x.UserId == userId, includes: x => x.Book);
    }
}