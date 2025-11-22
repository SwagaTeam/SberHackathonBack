using Domain.Entities;

namespace Application.Services.Abstractions;

public interface IEventService
{
    Task<Event> GetByIdAsync(Guid id);
    Task<IEnumerable<Event>> GetAllAsync();
    Task<Event> GetByNameAsync(string name);
    Task<Event> GetByAddress(string address);
}