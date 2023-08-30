# Use the official .NET SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /api

# Copy the .csproj and restore dependencies
COPY api/*.csproj ./
RUN dotnet restore

# Copy the remaining source code
COPY api/. ./
RUN dotnet publish -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /api
COPY --from=build /api/out ./

# Expose the necessary port
EXPOSE 80

# Start the application
ENTRYPOINT ["dotnet", "api.dll"]