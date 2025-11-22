using Domain.Entities;

namespace Application.Services.Abstractions;

public interface IUserEventService
{
    Task<UserEvent> GetByIdAsync(Guid id);
    Task<IEnumerable<UserEvent>> GetAllAsync();
    Task<IEnumerable<UserEvent>> GetByUserIdAsync(Guid userId);
    Task<UserEvent> GetByEventId(Guid userId);
}