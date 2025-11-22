using Application.Dto;
using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class EventService(IEventRepository eventRepository, IUserEventRepository userEventRepository) : IEventService
{
    public async Task<Guid> Sign(Guid eventId, Guid userId)
    {
        var ev = await GetByIdAsync(eventId);
        if (ev is null) throw new Exception("Event not found");
        if (ev.FreeEventSeats < 1) throw new ApplicationException("Event is too free.");
        ev.FreeEventSeats--;
        await eventRepository.SaveChangesAsync();
        var useEvent = new UserEvent
        {
            EventId = eventId,
            UserId = userId,
        };
        await userEventRepository.AddAsync(useEvent);
        await userEventRepository.SaveChangesAsync();
        return useEvent.Id;
    }

    public async Task<Guid> UnSign(Guid eventId, Guid userId)
    {
        var ev = await GetByIdAsync(eventId);
        if (ev is null) throw new Exception("Event not found");
        if (ev.FreeEventSeats < 1) throw new ApplicationException("Event is too free.");
        ev.FreeEventSeats++;
        await eventRepository.SaveChangesAsync();
        var userEvent = await userEventRepository.FindSingleAsync(x=>x.EventId == eventId && x.UserId == userId);
        if (userEvent is null) throw new Exception("UserEvent not found");
        userEventRepository.Delete(userEvent);
        await userEventRepository.SaveChangesAsync();
        return eventId;
    }
    public async Task<Guid> Create(EventDto eventDto)
    {
        var entity = new Event
        {
            Address = eventDto.Address,
            Description = eventDto.Description,
            Date = eventDto.Date,
            FreeEventSeats = eventDto.FreeEventSeats,
            IsSendNotification = eventDto.IsSendNotification,
            Name = eventDto.Name,
            RegisterRequired = eventDto.RegisterRequired,
            TotalEventSeats = eventDto.TotalEventSeats,
        };
        
        await eventRepository.AddAsync(entity);
        await eventRepository.SaveChangesAsync();
        return entity.Id;
    }
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