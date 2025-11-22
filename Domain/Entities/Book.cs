namespace Domain.Entities;

public class Book
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Description { get; set; }
    public string Publisher { get; set; }
    public int Count { get; set; }
    public DateOnly ReleaseDate { get; set; }
    public string Genre { get; set; }
    public int PageCount { get; set; }
    public string ImageUrl { get; set; }
    
    public virtual ICollection<BorrowRecord> BorrowRecords { get; set; } = new List<BorrowRecord>();

}