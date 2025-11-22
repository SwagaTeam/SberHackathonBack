using Domain.Entities;

namespace Application.Services.Extensions;

public static class BookExtensions
{
    public static IEnumerable<Book> GetTopGanre(this IEnumerable<Book> books, int top)
    {
        return books.OrderByDescending(x=>x.Genre).Take(top);
    }

    public static IEnumerable<Book> GetRecent(this IEnumerable<Book> books, int count)
    {
        var inHandBooks = books
            .Where(b => b.BorrowRecords.Any(br => br.InHand))
            .OrderByDescending(b => b.BorrowRecords
                .Where(br => br.InHand)
                .Max(br => br.ReservedDate))  
            .Take(count)
            .ToList(); 

        if (inHandBooks.Count >= count)
            return inHandBooks;

        var needed = count - inHandBooks.Count;

        var reservedBooks = books
            .Where(b => b.BorrowRecords.Any(br => br.IsReserved))
            .OrderByDescending(b => b.BorrowRecords
                .Where(br => br.IsReserved)
                .Max(br => br.ReservedDate))
            .Take(needed);

        return inHandBooks.Concat(reservedBooks);
    }

}