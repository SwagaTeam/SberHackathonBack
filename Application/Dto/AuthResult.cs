using Domain.Entities;

namespace Application.Dto;

public record AuthResult(
    string Token,
    User User
);