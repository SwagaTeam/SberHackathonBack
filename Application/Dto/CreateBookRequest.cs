namespace Application.Dto;

public class CreateBookRequest
{
    public Guid LibraryId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Publisher { get; set; }
    public string Description { get; set; }
    public string Language { get; set; }
    public int Count { get; set; }
    public DateOnly ReleaseDate { get; set; }
    public string Genre { get; set; }
    public int PageCount { get; set; }
    public string ImageUrl { get; set; }
}