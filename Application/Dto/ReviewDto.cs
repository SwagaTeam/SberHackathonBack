namespace Application.Dto;

public class ReviewDto
{
    public Guid BookId { get; set; }
    public Guid UserId { get; set; }
    public string Text { get; set; }
    public string Author { get; set; }
    public string BookName { get; set; }
    public double Rating { get; set; }
}