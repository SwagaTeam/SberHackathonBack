namespace Domain.Entities;

public class BorrowRecord
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid BookId { get; set; }
    public bool InHand { get; set; }
    public bool IsReserved { get; set; }
    public DateTime ReservedDate { get; set; }
    public DateTime ReturnBy { get; set; }
    
    public virtual Book Book { get; set; }
    public virtual User User { get; set; }
}