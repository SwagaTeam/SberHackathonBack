using System.Text.Json.Serialization;

namespace Application.Dto;

public class ReviewRequest
{
    [JsonIgnore]
    public Guid BookId { get; set; }
    public string Text { get; set; }
    public double Rating { get; set; }
}