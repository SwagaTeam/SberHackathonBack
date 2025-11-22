using System.Runtime.InteropServices.JavaScript;

namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; }   
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public string Salt { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public string Role { get; set; }
    public DateOnly Birthday { get; set; }
    public string PhoneNumber { get; set; }
    public int BooksInHand { get; set; }
    public virtual ICollection<BorrowRecord> UserBooks { get; set; } = new List<BorrowRecord>();
}