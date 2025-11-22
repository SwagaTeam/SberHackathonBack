using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Infrastructure.DAL.Repository.Implementations;

public class EventRepository(AppDbContext db) : GenericRepository<Event>(db), IEventRepository;