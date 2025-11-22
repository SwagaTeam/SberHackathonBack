using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Infrastructure.DAL.Repository.Implementations;

public class UserEventRepository(AppDbContext db) : GenericRepository<UserEvent>(db), IUserEventRepository;