namespace Domain.Entities;

public class Review
{
    public Guid Id { get; set; }
    public string Author { get; set; }
    public Guid AuthorId { get; set; }
    public double Rating { get; set; }
    public string Text { get; set; }
    public Guid BookId { get; set; }
    public string BookName { get; set; }
    public virtual Book Book { get; set; }
}