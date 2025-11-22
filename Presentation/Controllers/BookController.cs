using Application.Dto;
using Application.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SberHackathonBack.Controllers;

[Route("api/[controller]")]
public class BookController(IBookService bookService, IAIService aiService, IAuthService authService) : ControllerBase
{
    [HttpGet("get-by/{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var book = await bookService.GetByIdAsync(id);
        if (book == null) return NotFound();
        return Ok(book);
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetAll()
    {
        var books = await bookService.GetAllAsync();
        if (books is null) return NotFound();
        return Ok(books);
    }

    [HttpGet("get-recomended")]
    [Authorize]
    public async Task<IActionResult> GetRecommended()
    {
        var currentUser = await authService.GetCurrentUserAsync();
        var recommendation = await aiService.GetRecommendationAsync(currentUser.Id);
        return Ok(recommendation);
    }

    [HttpPost("create")]
    [Authorize(Roles = "Admin,Librarian")]
    public async Task<IActionResult> Create([FromBody] CreateBookRequest req)
    {
        var bookId = await bookService.CreateBook(req);
        return Ok(bookId);
    }

    [HttpPost("review-book/{id}")]
    [Authorize]
    public async Task<IActionResult> SendReview([FromBody] ReviewDto review)
    {
        var reviewId = await bookService.SendReview(review);
        return Ok(reviewId);
    }
}