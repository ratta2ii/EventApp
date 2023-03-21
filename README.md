## IMPORTANT: Add the following files to .gitignore to protect information (e.g. API keys, etc.)

    - appsettings.json
    - (Depending on info ???) appsettings.Developement.json


## .NET

    - dotnet watch --no-hot-reload --project API/ (applies a file watcher that restarts rather than hot reloading)
    - dotnet new -l (list of templates)
    - dotnet watch run --project ProjectName/ (starting nested project from root)


## Entity Framework Core

    - Microsoft.EntityFrameworkCore.Design
    - NOTE: Be sure to match ef packages to dotnet version
    - Use -s flag for startup project
    - Use -p flag for project storing the data context (session w/ database)
    - dotnet ef migrations add InitialCreate -s API -p Persistence


## React

    - npx create-react-app appNameHere --use-npm --template typescript

## NOTES

    - <React.StrictMode> causes double rendering in developement
    - shift + ctrl + p (select Developer Reload Window)
    - Clean Architecture (See clean architecture diagram by Uncle Bob)
    - Mediator Pattern
    - CQRS (Command Query Responsibility Segregation) Pattern
        - Command modifies State, and Query does not modify State (i.e. reads)
    - ORM (Object Relational Mapper (e.g. Entity Framework))