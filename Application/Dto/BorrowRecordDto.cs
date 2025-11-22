namespace Application.Dto;

public class BorrowRecordDto
{
    public Guid BookId { get; set; }
    public string BookName { get; set; }
    public DateTime ReturnBy { get; set; }
    public Guid UserId { get; set; }
    public string BookAuthor { get; set; }
    public bool InHand { get; set; }
}