namespace Application.Dto;

public class ReviewResponse
{
    public Guid UserId { get; set; }
    public string Author { get; set; }
    public string BookName { get; set; }
}