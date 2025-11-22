using Application.Dto;
using Application.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SberHackathonBack.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController(IEventService eventService, IAuthService authService) : ControllerBase
{
    [HttpGet("get-by-id/{id}")]
    [Authorize]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var ev = await eventService.GetByIdAsync(id);
        return ev == null ? NotFound() : Ok(ev);
    }

    [HttpGet("get-all")]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
        var ev = await eventService.GetAllAsync();
        return ev == null ? NotFound() : Ok(ev);
    }

    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] EventDto eventDto)
    {
        var id = await eventService.Create(eventDto);
        return Ok(id);
    }

    [HttpPost("sign/{eventId}")]
    [Authorize]
    public async Task<IActionResult> Sign([FromQuery] Guid eventId)
    {
        var currentUser = await authService.GetCurrentUserAsync();
        var id = await eventService.Sign(eventId, currentUser.Id);
        return Ok(id);
    }

    [HttpPost("unsign/{eventId}")]
    [Authorize]
    public async Task<IActionResult> UnSign([FromQuery] Guid eventId)
    {
        var currentUser = await authService.GetCurrentUserAsync();
        var id = await eventService.UnSign(eventId, currentUser.Id);
        return Ok(id);
    }
}