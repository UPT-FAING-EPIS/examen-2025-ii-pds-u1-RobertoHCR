# Imagen base para compilar .NET
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar csproj y restaurar dependencias
COPY ExamApi.csproj ./
RUN dotnet restore ExamApi.csproj

# Copiar todo el código y compilar
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Imagen de runtime (más ligera)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ExamApi.dll"]
