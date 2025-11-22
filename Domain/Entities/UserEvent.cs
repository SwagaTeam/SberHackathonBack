namespace Domain.Entities;

public class UserEvent
{
    public Guid Id { get; set; }
    public Guid EventId { get; set; }
    public Guid UserId { get; set; }
    
    public virtual User User { get; set; }
    public virtual Event Event { get; set; }
}