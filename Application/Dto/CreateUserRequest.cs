namespace Application.Dto;

public record CreateUserRequest(
    string PhoneNumber,
    string FullName,
    string Password,
    string Role,
    DateOnly BirthDate
);