namespace Domain.Entities
{
    public class Chat
    {
        public Guid Id { get; set; }
        public string ChatId { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public bool IsAwaitingPhone { get; set; } = false;
    }
}
