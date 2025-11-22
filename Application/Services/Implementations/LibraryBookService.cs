using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class LibraryBookService(ILibraryBookRepository libraryBookRepository) : ILibraryBookService
{
    public async Task<IEnumerable<LibraryBooks>> GetAllAsync()
    {
        return await libraryBookRepository.ListAsync();
    }

    public async Task<LibraryBooks> GetByIdAsync(Guid id)
    {
        return await libraryBookRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<LibraryBooks>> GetByLibraryIdAsync(Guid libraryId)
    {
        return await libraryBookRepository.ListAsync(x=>x.LibraryId == libraryId);
    }

    public async Task<LibraryBooks> GetByBookId(Guid bookId)
    {
        return await libraryBookRepository.FindSingleAsync(x=>x.BookId == bookId);
    }

    public async Task CreateAsync(Guid bookId, Guid libraryId)
    {
        var entity = new  LibraryBooks { BookId = bookId, LibraryId = libraryId };
        await libraryBookRepository.AddAsync(entity);
        await libraryBookRepository.SaveChangesAsync();
    }
}