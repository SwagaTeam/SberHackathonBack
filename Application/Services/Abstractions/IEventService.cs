using Application.Dto;
using Domain.Entities;

namespace Application.Services.Abstractions;

public interface IEventService
{
    Task<Event> GetByIdAsync(Guid id);
    Task<IEnumerable<Event>> GetAllAsync();
    Task<Event> GetByNameAsync(string name);
    Task<Event> GetByAddress(string address);
    Task<Guid> Create(EventDto eventDto);
    Task<Guid> Sign(Guid eventId, Guid userId);
    Task<Guid> UnSign(Guid eventId, Guid userId);
}