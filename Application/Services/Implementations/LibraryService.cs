using Application.Dto;
using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class LibraryService(ILibraryRepository libraryRepository) : ILibraryService
{
    public async Task<Guid> CreateLibrary(LibraryDto library)
    {
        var entity = new Library
        {
            Name = library.Name,
            Address = library.Address,
        };
        
        await libraryRepository.AddAsync(entity);
        await libraryRepository.SaveChangesAsync();
        return entity.Id;
    }

    public async Task<Library> GetByIdAsync(Guid id)
    {
        return await libraryRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Library>> GetAllAsync()
    {
        return await libraryRepository.ListAsync();
    }

    public async Task<Library> GetByNameAsync(string name)
    {
        return await libraryRepository.FindSingleAsync(x => x.Name == name);
    }

    public async Task<Library> GetByAddressAsync(string addres)
    {
        return await libraryRepository.FindSingleAsync(x => x.Address == addres);
    }
}