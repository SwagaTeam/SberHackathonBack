using Application.Dto;
using Domain.Entities;

namespace Application.Services.Abstractions;

public interface IBookService
{
    Task<IEnumerable<Book>> ListByUserIdAsync(Guid userId);
    Task<Book> GetByIdAsync(Guid id);
    Task<IEnumerable<Book>> GetAllAsync();
    Task<IEnumerable<Book>> GetByGenre(string genre);
    Task<IEnumerable<Book>> GetByAuthor(string author);
    Task<IEnumerable<Book>> GetByPublisher(string publisher);
    Task<IEnumerable<Book>> GetAfterReleaseDate(DateOnly date);
    Task<Guid> ReserveBook(Guid bookId, Guid userId, DateTime returnBy);
    Task<Guid> CreateBook(CreateBookRequest bookReq);
    Task<Guid> SendReview(ReviewRequest req);
    Task<IEnumerable<ReviewResponse>> GetReviews(Guid bookId);
    Task<Guid> GiveBookInHand(Guid userId, Guid bookId);
}