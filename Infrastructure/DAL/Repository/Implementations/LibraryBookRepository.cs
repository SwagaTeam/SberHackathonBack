using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Infrastructure.DAL.Repository.Implementations;

public class LibraryBookRepository(AppDbContext db) : GenericRepository<LibraryBooks>(db), ILibraryBookRepository;