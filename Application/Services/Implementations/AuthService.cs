using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Dto;
using Application.Services.Abstractions;
using Domain.Constants;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shared.Encrypt;
using Shared.Middleware;

namespace Application.Services.Implementations;

public class AuthService(
    IPasswordHasher hasher,
    IBlackListService blacklistService,
    IConfiguration configuration,
    IHttpContextAccessor httpContextAccessor,
    IUserService userService)
    : IAuthService
{
    public async Task<AuthResult?> AuthenticateAsync(string phoneNumber, string password)
    {
        var user = await userService.GetByPhoneNumberAsync(phoneNumber);
        if (user == null) return null;
        if (!hasher.Verify(user.PasswordHash, user.Salt, password)) return null;

        var token = GenerateJwtToken(user);

        return new AuthResult(token, user);
    }


    public async Task<User> CreateUserAsync(string phoneNumber, string fullName, string password,
        string roleName, DateOnly birthDate)
    {
        if (await userService.IsUserExistAsync(phoneNumber)) 
            throw new InvalidOperationException("ѕользователь существует");

        if (roleName == RolesConstants.Librarian || 
           roleName == RolesConstants.Admin)
        {
            var currentUser = await GetCurrentUserAsync() ?? throw new AccessViolationException("—оздание нового пользовател€ с ролью сотрудника невозможно.");

            if (currentUser.Role != RolesConstants.Admin)
                throw new AccessViolationException($"“олько админ может создавать пользователей с ролью {roleName}.");
        }

        var salt = Guid.NewGuid().ToString();
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = phoneNumber,
            Username = fullName,
            PasswordHash = hasher.HashPassword(password, salt),
            Salt = salt,
            Role = roleName,
            Birthday = birthDate,
        };
        await userService.AddAsync(user);

        await userService.SaveAsync();
        return user;
    }

    public async Task<UserDto?> GetCurrentUserAsync()
    {
        var id = GetCurrentUserId();

        if (id == Guid.Empty) return null;
        var user = await userService.GetByIdAsync(id);
        return new UserDto(id, user.Email, user.PhoneNumber, user.Username, user.UserBooks.Select(x=>new BorrowRecordDto
        {
            BookId = x.BookId,
            BookAuthor = x.Book.Author,
            BookName = x.Book.Title,
            InHand = x.InHand,
            ReturnBy = x.ReturnBy,
            UserId = x.UserId
        }), user.Created, user.Role);
    }

    public Guid GetCurrentUserId()
    {
        var claimsIdentity = httpContextAccessor.HttpContext?.User.Identity as ClaimsIdentity;
        var id = Guid.Parse(claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());
        return id;
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid id)
    {
        var user = await userService.GetByIdAsync(id);
        return new UserDto(id, user.Email, user.PhoneNumber, user.Username, user.UserBooks.Select(x=>new BorrowRecordDto
        {
            BookId = x.BookId,
            BookAuthor = x.Book.Author,
            BookName = x.Book.Title,
            InHand = x.InHand,
            ReturnBy = x.ReturnBy,
            UserId = x.UserId
        }), user.Created, user.Role);
    }


    public IEnumerable<string> GetCurrentUserRoles()
    {
        var claimsIdentity = httpContextAccessor.HttpContext?.User.Identity as ClaimsIdentity;
        return claimsIdentity?.FindAll(ClaimTypes.Role).Select(claim => claim.Value).ToList() ?? new List<string>();
    }

    public void Logout(string token)
    {
        blacklistService.AddTokenToBlacklist(token);
    }

    public async Task<UserDto?> GetUserById(Guid id)
    {
        if (id != Guid.Empty)
        {
            var user = await userService.GetByIdAsync(id);
            return new UserDto(id, user.Email, user.PhoneNumber, user.Username, user.UserBooks.Select(x=>new BorrowRecordDto
                {
                    BookId = x.BookId,
                    BookAuthor = x.Book.Author,
                    BookName = x.Book.Title,
                    InHand = x.InHand,
                    ReturnBy = x.ReturnBy,
                    UserId = x.UserId
                }), user.Created, user.Role);
        }

        return null;
    }

    public string GenerateJwtToken(User user)
    {
        var userRole = user.Role;

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user?.Id.ToString() ?? string.Empty),
            new(ClaimTypes.NameIdentifier, user?.Id.ToString() ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };


        claims.AddRange(new Claim(ClaimTypes.Role, userRole));
        var securityKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(configuration["Jwt:ExpiresInMinutes"])),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}