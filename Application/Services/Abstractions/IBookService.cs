using Domain.Entities;

namespace Application.Services.Abstractions;

public interface IBookService
{
    Task<IEnumerable<Book>> ListByUserIdAsync(Guid userId);
}