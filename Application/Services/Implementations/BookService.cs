using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class BookService(IUserRepository userRepository, IBorrowRecordRepository borrowRecordRepository) : IBookService
{
    public async Task<IEnumerable<Book>> ListByUserIdAsync(Guid userId)
    {
        var borrowRecords = await borrowRecordRepository.GetByUserId(userId);
        var books = borrowRecords.Select(x => x.Book);
        return books;
    }
}