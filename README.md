IMPORTANT: Add the following files to .gitignore to protect information (e.g. API keys, etc.)

    - appsettings.json
    - (Depending on info ???) appsettings.Developement.json

Entity Framework Core
    - Microsoft.EntityFrameworkCore.Design
    - NOTE: Be sure to match ef packages to dotnet version
    - Use -s flag for startup project
    - Use -p flag for project storing the data context (session w/ database)
    - dotnet ef migrations add InitialCreate -s API -p Persistence




    - dotnet watch --no-hot-reload (applies a file watcher that restarts rather than hot reloading)
    - dotnet new -l (list of templates)