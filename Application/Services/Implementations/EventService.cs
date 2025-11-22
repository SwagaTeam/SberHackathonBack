using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class EventService(IEventRepository eventRepository) : IEventService
{
    public async Task<Event> GetByIdAsync(Guid id)
    {
        return await eventRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Event>> GetAllAsync()
    {
        return await eventRepository.ListAsync();
    }

    public async Task<Event> GetByNameAsync(string name)
    {
        return await eventRepository.FindSingleAsync(x => x.Name == name);
    }

    public async Task<Event> GetByAddress(string address)
    {
        return await eventRepository.FindSingleAsync(x => x.Address == address);
    }
}