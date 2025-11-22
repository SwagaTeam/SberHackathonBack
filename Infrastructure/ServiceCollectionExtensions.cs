using Infrastructure.DAL.Repository.Abstractions;
using Infrastructure.DAL.Repository.Implementations;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<IBorrowRecordRepository, BorrowRecordRepository>();
            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<ILibraryBookRepository, LibraryBookRepository>();
            services.AddScoped<ILibraryRepository, LibraryRepository>();
            services.AddScoped<IReviewRepository, ReviewRepository>();
            services.AddScoped<IUserEventRepository, UserEventRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
