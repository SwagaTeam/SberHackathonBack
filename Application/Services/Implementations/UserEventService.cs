using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class UserEventService(IUserEventRepository userEventRepository) : IUserEventService
{
    public async Task<UserEvent> GetByIdAsync(Guid id)
    {
        return await userEventRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<UserEvent>> GetAllAsync()
    {
        return await userEventRepository.ListAsync();
    }

    public async Task<IEnumerable<UserEvent>> GetByUserIdAsync(Guid userId)
    {
        return await userEventRepository.ListAsync(u => u.UserId == userId);
    }

    public async Task<UserEvent> GetByEventId(Guid userId)
    {
        return await userEventRepository.FindSingleAsync(x => x.EventId == userId);
    }
}