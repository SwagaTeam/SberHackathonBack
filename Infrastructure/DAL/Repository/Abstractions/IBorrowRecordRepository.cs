using Domain.Entities;

namespace Infrastructure.DAL.Repository.Abstractions;

public interface IBorrowRecordRepository
{
    Task<IEnumerable<BorrowRecord>> GetByUserId(Guid userId);
}