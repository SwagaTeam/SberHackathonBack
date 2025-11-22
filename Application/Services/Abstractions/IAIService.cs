namespace Application.Services.Abstractions;

public interface IAIService
{
    Task<string> GetRecommendationAsync(Guid userId);
}