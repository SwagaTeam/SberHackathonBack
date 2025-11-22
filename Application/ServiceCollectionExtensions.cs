using Application.Services.Abstractions;
using Application.Services.Implementations;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IAIService, AIService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<ILibraryBookService, LibraryBookService>();
            services.AddScoped<ILibraryService, LibraryService>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
