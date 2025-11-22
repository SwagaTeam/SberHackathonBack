using Domain.Entities;

namespace Application.Dto;

public record UserDto(
    Guid Id,
    string Email,
    string PhoneNumber,
    string FullName,
    IEnumerable<BorrowRecordDto> UserBooks,
    DateTime Created,
    string Role
);