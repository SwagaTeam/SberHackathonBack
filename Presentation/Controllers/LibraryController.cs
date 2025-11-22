using Application.Dto;
using Application.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SberHackathonBack.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibraryController(ILibraryService libraryService) : ControllerBase
{
    [HttpPost("create")]
    [Authorize("Admin")]
    public async Task<IActionResult> Create([FromBody] LibraryDto library)
    {
        var id = await libraryService.CreateLibrary(library);
        return Ok(id);
    }

    [HttpGet("get-by/{id}")]
    [Authorize]
    public async Task<IActionResult> GetById([FromQuery] Guid id)
    {
        return Ok(await libraryService.GetByIdAsync(id));
    }

    [HttpGet("get-all")]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await libraryService.GetAllAsync());
    }
}