using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<User?> FindByEmailAsync(string email)
    {
        return await userRepository.FindByEmailAsync(email);
    }
    
     public async Task<User?> GetByIdAsync(Guid id)
    {
        return await userRepository.GetByIdAsync(id);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await userRepository.FindSingleAsync(u => u.Email == email);
    }

    public async Task<User?> GetByPhoneNumberAsync(string phoneNumber)
    {
        return await userRepository.FindSingleAsync(u => u.PhoneNumber == phoneNumber);
    }

    /*public async Task<User?> UpdateUser(UpdateUserRequest request)
    {
        var user = await userRepository.GetByIdAsync(request.Id);

        if (request.DeputyId is not null)
        {
            var deputy = await userRepository.GetByIdAsync((Guid)request.DeputyId);

            if (deputy == null ||
                deputy.UserRoles.Any(r => r.Role.Name != UserRoles.Deputy) ||
                user.UserRoles.Any(r => r.Role.Name != UserRoles.Helper))
                throw new KeyNotFoundException("Не найден депутат либо попытка привязать депутата к депутату");
        }

        if (request.DeputyId == user.Id)
            throw new ArgumentException("Нельзя связать пользователя с самим собой");

        user.Email = request.Email;
        user.JobTitle = request.JobTitle;
        user.FullName = request.FullName;
        user.UserRoles = request.UserRoles;
        user.DeputyId = request.DeputyId;

        _uow.Users.Update(user);
        await _uow.SaveChangesAsync();

        return user;
    }*/


    public async Task<IEnumerable<User>> ListAsync(int skip = 0, int take = 50)
    {
        return await userRepository.ListAsync(null, skip, take);
    }
}