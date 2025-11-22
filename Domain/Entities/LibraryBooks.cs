namespace Domain.Entities;

public class LibraryBooks
{
    public Guid Id { get; set; }
    public Guid BookId { get; set; }
    public Guid LibraryId { get; set; }
}