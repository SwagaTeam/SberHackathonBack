using Application.Dto;
using Domain.Entities;

namespace Application.Services.Abstractions;

public interface IUserService
{
    Task<User?> GetByIdAsync(Guid id);
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByPhoneNumberAsync(string phoneNumber);
    Task<IEnumerable<User>> ListAsync(int skip = 0, int take = 50);
    Task<bool> IsUserExistAsync(string phoneNumber);
    Task AddAsync(User user);
    Task<int> SaveAsync();
}