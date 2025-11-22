using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Infrastructure.DAL.Repository.Implementations;

public class ReviewRepository(AppDbContext db) : GenericRepository<Review>(db), IReviewRepository
{
    
}