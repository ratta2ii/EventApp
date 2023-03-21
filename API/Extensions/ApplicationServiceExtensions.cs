using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using Persistence;
using Application.Core;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            // This will be acting as the mediator, rather than the controller directly accessing the data context.
            services.AddMediatR(typeof(List.Handler));

            // Registers all mapping profiles (i.e., merging objects during edit). 
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}