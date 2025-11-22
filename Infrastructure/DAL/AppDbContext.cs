using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DAL;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<BorrowRecord> BorrowRecords => Set<BorrowRecord>();
    public DbSet<Book> Books => Set<Book>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


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
        });


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
        });


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
    }
}