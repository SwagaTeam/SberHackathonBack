using System.Text;
using System.Text.Json;
using Application.Services.Abstractions;
using Application.Services.Extensions;

namespace Application.Services.Implementations;

public class AIService(HttpClient httpClient, IBookService bookService) : IAIService
{
    private static readonly string apiKey = "AIzaSyC7Mr3MKUF7J-cps6I1Hfmr4hQWB5cVJ2Q";

    private readonly string geminiUrl =
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";
    
    public async Task<string> GetRecommendationAsync(Guid userId)
    {
        var history = await bookService.ListByUserIdAsync(userId);
        var favoriteGenres = history.GetTopGanre(5);
        var recentBooks = history.GetRecent(5);

        var prompt = new
        {
            contents = new[]
            {
                new
                {
                    role = "user",
                    parts = new[]
                    {
                        new { text = "Ты — рекомендательная система книг. Дай точные рекомендации." },
                        new { text = $"Предпочтительные жанры: {string.Join(", ", favoriteGenres)}" },
                        new { text = $"Последние книги: {string.Join(", ", recentBooks)}" }
                    }
                }
            }
        };

        return await SendGeminiRequestAsync(prompt);
    }
    
    private async Task<string?> SendGeminiRequestAsync(object requestBody)
    {
        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, geminiUrl);
        request.Headers.Add("x-goog-api-key", apiKey);
        request.Content = content;

        var response = await httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            var errorText = await response.Content.ReadAsStringAsync();
            throw new Exception($"Gemini API Error: {response.StatusCode}, {errorText}");
        }

        var responseJson = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(responseJson);

        var candidates = doc.RootElement.GetProperty("candidates");
        if (candidates.GetArrayLength() == 0)
            throw new Exception("Gemini API Error: Empty candidates in response.");

        return candidates[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();
    }
}