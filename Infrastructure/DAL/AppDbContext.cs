using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DAL;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<BorrowRecord> BorrowRecords => Set<BorrowRecord>();
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Chat> Chats => Set<Chat>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<UserEvent> UserEvents => Set<UserEvent>();
    public DbSet<Library> Libraries => Set<Library>();
    public DbSet<LibraryBooks> LibraryBooks => Set<LibraryBooks>();
    public DbSet<Review> Reviews => Set<Review>();  // Добавляем DbSet<Review>

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Настройки сущности User
        modelBuilder.Entity<User>(b =>
        {
            b.HasKey(x => x.Id);

            b.Property(x => x.Email).IsUnicode();
            b.Property(x => x.PhoneNumber).IsUnicode();
            b.Property(x => x.PasswordHash).IsRequired();
            b.Property(x => x.Salt).IsRequired();
            b.Property(x => x.Username).IsUnicode();
            b.Property(x => x.Role).IsUnicode();
            b.Property(x => x.Created);
            b.Property(x => x.Birthday);
            b.Property(x => x.BooksInHand);

            // Отношение с BorrowRecords
            b.HasMany(x => x.UserBooks)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Настройки сущности Book
        modelBuilder.Entity<Book>(b =>
        {
            b.HasKey(x => x.Id);

            b.Property(x => x.Title).IsRequired().IsUnicode();
            b.Property(x => x.Author).IsUnicode();
            b.Property(x => x.Description).IsUnicode();
            b.Property(x => x.Publisher).IsUnicode();
            b.Property(x => x.Genre).IsUnicode();
            b.Property(x => x.ImageUrl);

            b.Property(x => x.Count).IsRequired();
            b.Property(x => x.PageCount).IsRequired();
            b.Property(x => x.ReleaseDate);
            b.Property(x => x.Rating).HasDefaultValue(0); // по умолчанию рейтинг равен 0

            // Отношение с BorrowRecords
            b.HasMany(x => x.BorrowRecords)
                .WithOne(x => x.Book)
                .HasForeignKey(x => x.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            // Отношение с Reviews
            b.HasMany(x => x.Reviews)
                .WithOne(x => x.Book)
                .HasForeignKey(x => x.BookId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Настройки сущности BorrowRecord
        modelBuilder.Entity<BorrowRecord>(b =>
        {
            b.HasKey(x => x.Id);

            b.Property(x => x.InHand).IsRequired();
            b.Property(x => x.IsReserved).IsRequired();
            b.Property(x => x.ReservedDate).IsRequired();
            b.Property(x => x.ReturnBy).IsRequired();

            b.HasOne(x => x.User)
                .WithMany(u => u.UserBooks)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            b.HasOne(x => x.Book)
                .WithMany(bk => bk.BorrowRecords)
                .HasForeignKey(x => x.BookId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Настройки сущности Review
        modelBuilder.Entity<Review>(b =>
        {
            b.HasKey(x => x.Id);

            b.Property(x => x.Author).IsUnicode();
            b.Property(x => x.Text).IsUnicode();
            b.Property(x => x.Rating).IsRequired();
            b.Property(x => x.BookName).IsUnicode(); // Optional: если надо сохранять название книги в отзыве

            // Настройка внешнего ключа на Book
            b.HasOne(x => x.Book)
                .WithMany(b => b.Reviews)  // Один Book может иметь много Reviews
                .HasForeignKey(x => x.BookId)  // Внешний ключ
                .OnDelete(DeleteBehavior.Cascade);  // Если книга удаляется, удаляются и отзывы
        });

        // Настройки сущности Chat
        modelBuilder.Entity<Chat>(b =>
        {
            b.HasKey(x => x.Id);

            b.Property(x => x.ChatId).IsRequired().IsUnicode(); // Убедись, что ChatId уникален
        });

        // Настройки сущности Event
        modelBuilder.Entity<Event>(b =>
        {
            b.HasKey(x => x.Id);

            b.Property(x => x.Name).IsRequired().IsUnicode();
            b.Property(x => x.Date).IsRequired();
            b.Property(x => x.Address).IsUnicode();
            b.Property(x => x.Description).IsUnicode();
            b.Property(x => x.RegisterRequired).IsRequired();
            b.Property(x => x.TotalEventSeats).IsRequired();
            b.Property(x => x.FreeEventSeats).IsRequired();
            b.Property(x => x.IsSendNotification).IsRequired();
        });

        // Настройки сущности Library
        modelBuilder.Entity<Library>(b =>
        {
            b.HasKey(x => x.Id);

            b.Property(x => x.Name).IsRequired().IsUnicode();
            b.Property(x => x.Address).IsUnicode();
        });

        // Настройки сущности LibraryBooks (связь Many-to-Many между Book и Library)
        modelBuilder.Entity<LibraryBooks>(b =>
        {
            b.HasKey(x => x.Id);

            b.HasOne(x => x.Library)
                .WithMany()
                .HasForeignKey(x => x.LibraryId)
                .OnDelete(DeleteBehavior.Cascade);

            b.HasOne(x => x.Book)
                .WithMany()
                .HasForeignKey(x => x.BookId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Настройки сущности UserEvent (связь Many-to-Many между User и Event)
        modelBuilder.Entity<UserEvent>(b =>
        {
            b.HasKey(x => x.Id);

            b.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            b.HasOne(x => x.Event)
                .WithMany()
                .HasForeignKey(x => x.EventId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
