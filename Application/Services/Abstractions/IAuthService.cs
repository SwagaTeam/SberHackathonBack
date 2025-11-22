using Application.Dto;
using Domain.Entities;

namespace Application.Services.Abstractions;

public interface IAuthService
{
    Task<AuthResult?> AuthenticateAsync(string phoneNumber, string password);

    Task<User> CreateUserAsync(string phoneNumber, string fullName, string password, string roleName, DateOnly birthDate);
    Task<UserDto?> GetCurrentUserAsync();
    Guid GetCurrentUserId();
    Task<UserDto?> GetUserByIdAsync(Guid id);
}