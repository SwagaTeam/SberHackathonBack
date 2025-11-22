using Domain.Entities;

namespace Infrastructure.DAL.Repository.Abstractions;

public interface IBorrowRecordRepository : IRepository<BorrowRecord>
{
    Task<IEnumerable<BorrowRecord>> GetByUserId(Guid userId);
}