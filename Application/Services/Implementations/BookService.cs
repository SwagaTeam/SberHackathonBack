using Application.Dto;
using Application.Services.Abstractions;
using Domain.Entities;
using Infrastructure.DAL.Repository.Abstractions;

namespace Application.Services.Implementations;

public class BookService(
    IBorrowRecordRepository borrowRecordRepository,
    IBookRepository bookRepository,
    ILibraryService libraryService,
    ILibraryBookService libraryBookService, IReviewRepository reviewRepository) : IBookService
{
    public async Task<Guid> CreateBook(CreateBookRequest bookReq)
    {
        ArgumentNullException.ThrowIfNull(bookReq);
        var book = new Book
        {
            Author = bookReq.Author,
            Count = bookReq.Count,
            Description = bookReq.Description,
            Genre = bookReq.Genre,
            Language = bookReq.Language,
            ImageUrl = bookReq.ImageUrl,
            PageCount = bookReq.PageCount,
            Title = bookReq.Title,
            Publisher = bookReq.Publisher,
        };

        var library = await libraryService.GetByIdAsync(bookReq.LibraryId);
        if (library is null) throw new ArgumentException();

        await bookRepository.AddAsync(book);
        await bookRepository.SaveChangesAsync();
        await libraryBookService.CreateAsync(book.Id, bookReq.LibraryId);
        return book.Id;
    }

    public async Task<IEnumerable<Book>> ListByUserIdAsync(Guid userId)
    {
        var borrowRecords = await borrowRecordRepository.GetByUserId(userId);
        var books = borrowRecords.Select(x => x.Book);
        return books;
    }

    public async Task<Book> GetByIdAsync(Guid id)
    {
        return await bookRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Book>> GetAllAsync()
    {
        return await bookRepository.ListAsync();
    }

    public async Task<IEnumerable<Book>> GetByGenre(string genre)
    {
        return await bookRepository.FindAsync(x => x.Genre == genre);
    }

    public async Task<IEnumerable<Book>> GetByAuthor(string author)
    {
        return await bookRepository.FindAsync(x => x.Author == author);
    }

    public async Task<IEnumerable<Book>> GetByPublisher(string publisher)
    {
        return await bookRepository.FindAsync(x => x.Publisher == publisher);
    }

    public async Task<IEnumerable<Book>> GetAfterReleaseDate(DateOnly date)
    {
        return await bookRepository.FindAsync(x => x.ReleaseDate >= date);
    }

    public async Task<Guid> ReserveBook(Guid bookId, Guid userId, DateTime returnBy)
    {
        var book = await bookRepository.GetByIdAsync(bookId);
        if (book.Count < 1)
        {
            throw new ArgumentException("Book not found");
        }

        book.Count--;
        await bookRepository.SaveChangesAsync();

        var borrowRecord = new BorrowRecord
        {
            Book = book,
            UserId = userId,
            IsReserved = true,
            ReturnBy = returnBy,
            ReservedDate = DateTime.Now
        };

        await borrowRecordRepository.AddAsync(borrowRecord);
        await borrowRecordRepository.SaveChangesAsync();
        return book.Id;
    }

    public async Task<Guid> SendReview(ReviewDto req)
    {
        var entity = new Review
        {
            BookId = req.BookId,
            Text = req.Text,
            Author = req.Author,
            AuthorId = req.UserId,
            BookName = req.BookName,
        };

        await reviewRepository.AddAsync(entity);
        await reviewRepository.SaveChangesAsync();
        var book = await bookRepository.GetByIdAsync(req.BookId);
        var avg = book.Reviews.Average(x => x.Rating);
        book.Rating = avg;
        await bookRepository.SaveChangesAsync();
        return entity.Id;
    }
}