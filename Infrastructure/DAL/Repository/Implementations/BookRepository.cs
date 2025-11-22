using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Infrastructure.DAL.Repository.Implementations;

public class BookRepository(AppDbContext db) : GenericRepository<Book>(db), IBookRepository
{
}