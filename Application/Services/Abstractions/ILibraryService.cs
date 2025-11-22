using Domain.Entities;

namespace Application.Services.Abstractions;

public interface ILibraryService
{
    Task<Library> GetByIdAsync(Guid id);
    Task<IEnumerable<Library>> GetAllAsync();
    Task<Library> GetByNameAsync(string name);
    Task<Library> GetByAddressAsync(string addres);
}