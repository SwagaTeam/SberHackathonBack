namespace Domain.Entities;

public class LibraryBooks
{
    public Guid Id { get; set; }
    public Guid BookId { get; set; }
    public Guid LibraryId { get; set; }
    
    public virtual Library Library { get; set; }
    public virtual Book Book { get; set; }
}