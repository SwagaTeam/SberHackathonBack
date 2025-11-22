using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class UserService(IUserRepository userRepository, IBorrowRecordRepository borrowRecordRepository) : IUserService
{
    public Task<User?> FindByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }
}