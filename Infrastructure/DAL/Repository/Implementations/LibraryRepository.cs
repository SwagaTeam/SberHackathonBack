using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Infrastructure.DAL.Repository.Implementations;

public class LibraryRepository(AppDbContext db) : GenericRepository<Library>(db), ILibraryRepository;