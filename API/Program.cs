using Microsoft.EntityFrameworkCore;
using Persistence;
using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// IMPORTANT NOTE: We use an extension method here to add the bulk of services.
// (See AddApplicationServices method for more details)
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage(); // (Built-in > .net5)
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
// app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

// SECTION START: Database Migrations
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during ef migration.");
}
// SECTION END: Database Migrations

app.Run();
