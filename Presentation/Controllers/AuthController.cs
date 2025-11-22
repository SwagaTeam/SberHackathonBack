using Application.Dto;
using Application.Services.Abstractions;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace SberHackathonBack.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService auth) : ControllerBase
{
    /// <summary>
    ///     Аутентификация пользователя и получение JWT токена.
    /// </summary>
    /// <param name="req">Объект запроса с Email и паролем пользователя.</param>
    /// <returns>
    ///     200 OK с JWT токеном при успешной аутентификации.
    ///     401 Unauthorized если Email или пароль неверные.
    /// </returns>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResult), 200)]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var res = await auth.AuthenticateAsync(req.Email, req.Password);
        if (res == null) return Unauthorized();
        return Ok(res);
    }

    /// <summary>
    ///     Создание нового пользователя. (Роли - Admin, Deputy, Helper)
    /// </summary>
    /// <param name="req">
    ///     Объект запроса с Email, полным именем, паролем и ролями пользователя, а также ID привязанного
    ///     депутата, если пользователь помощник.
    /// </param>
    /// <returns>
    ///     201 Created с информацией о созданном пользователе.
    ///     Возвращаются роли в виде массива строк.
    /// </returns>
    [HttpPost("create")]
    [ProducesResponseType(typeof(User), 200)]
    public async Task<IActionResult> Create([FromBody] CreateUserRequest req)
    {
        if (req.Role is null) return ValidationProblem("Не заданы роли пользователя");
        
        var user = await auth.CreateUserAsync(req.PhoneNumber, req.FullName, req.Password, req.Role, req.BirthDate);
        var userDto = new UserDto(user.Id, user.Email, user.PhoneNumber, user.Username, user.UserBooks.Select(x=>new BorrowRecordDto
        {
            BookId = x.BookId,
            BookAuthor = x.Book.Author,
            BookName = x.Book.Title,
            InHand = x.InHand,
            ReturnBy = x.ReturnBy,
            UserId = x.UserId
        }), user.Created, user.Role);
        return CreatedAtAction(nameof(Get), new { id = user.Id }, userDto);
    }

    /// <summary>
    ///     Обновление пользователя.
    /// </summary>
    /// <param name="req">Объект запроса с Email, полным именем, паролем и ролями пользователя.</param>
    /// <returns>
    ///     201 Created с информацией о созданном пользователе.
    ///     Возвращаются роли в виде массива строк.
    /// </returns>
    /*[HttpPost("update")]
    [ProducesResponseType(typeof(User), 200)]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update([FromBody] UpdateUserRequest req)
    {
        var user = await _userService.UpdateUser(req);
        var dto = new UserDto(user.Id, user.Email, user.FullName, user.JobTitle, user.Posts, user.EventsOrganized,
            user.Documents,
            user.Deputy,
            user.UserRoles.Select(r => r.Role.Name).ToArray());
        return CreatedAtAction(nameof(Get), new { id = user.Id }, dto);
    }*/

    /// <summary>
    ///     Получить информацию о пользователе по его уникальному идентификатору.
    /// </summary>
    /// <param name="id">Уникальный идентификатор пользователя.</param>
    /// <returns>
    ///     200 OK с информацией о пользователе, если найден.
    ///     404 Not Found если пользователь не найден.
    /// </returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(User), 200)]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var user = await auth.GetUserByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    /// <summary>
    ///     Получить информацию о текущем аутентифицированном пользователе.
    /// </summary>
    /// <returns>
    ///     200 OK с информацией о текущем пользователе.
    ///     401 Unauthorized если пользователь не аутентифицирован.
    /// </returns>
    [HttpGet("current")]
    [ProducesResponseType(typeof(UserDto), 200)]
    public async Task<IActionResult> Get()
    {
        var user = await auth.GetCurrentUserAsync();
        if (user == null) return Unauthorized();
        return Ok(user);
    }
}
