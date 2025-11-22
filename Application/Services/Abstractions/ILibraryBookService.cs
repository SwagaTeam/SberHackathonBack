using Domain.Entities;

namespace Application.Services.Abstractions;

public interface ILibraryBookService
{
    Task<IEnumerable<LibraryBooks>> GetAllAsync();
    Task<LibraryBooks> GetByIdAsync(Guid id);
    Task<IEnumerable<LibraryBooks>> GetByLibraryIdAsync(Guid libraryId);
    Task<LibraryBooks> GetByBookId(Guid bookId);
    Task CreateAsync(Guid bookId, Guid libraryId);
}