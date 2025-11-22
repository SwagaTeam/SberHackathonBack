using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class BookService(IBorrowRecordRepository borrowRecordRepository, IBookRepository bookRepository) : IBookService
{
    public async Task<IEnumerable<Book>> ListByUserIdAsync(Guid userId)
    {
        var borrowRecords = await borrowRecordRepository.GetByUserId(userId);
        var books = borrowRecords.Select(x => x.Book);
        return books;
    }

    public async Task<Book> GetByIdAsync(Guid id)
    {
        return await bookRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Book>> GetAllAsync()
    {
        return await bookRepository.ListAsync();
    }

    public async Task<IEnumerable<Book>> GetByGenre(string genre)
    {
        return await bookRepository.FindAsync(x => x.Genre == genre);
    }

    public async Task<IEnumerable<Book>> GetByAuthor(string author)
    {
        return await bookRepository.FindAsync(x => x.Author == author);
    }

    public async Task<IEnumerable<Book>> GetByPublisher(string publisher)
    {
        return await bookRepository.FindAsync(x => x.Publisher == publisher);
    }

    public async Task<IEnumerable<Book>> GetAfterReleaseDate(DateOnly date)
    {
        return await bookRepository.FindAsync(x => x.ReleaseDate >= date);
    }
}