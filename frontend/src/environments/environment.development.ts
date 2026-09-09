export const environment = {
  production: false,
  // Backend Wiego (.NET). Routes are root-absolute (no /api prefix).
  //   dotnet run --project Wiego.Api  -> http://localhost:5290   (default here)
  //   docker compose up               -> http://localhost:8080
  apiUrl: 'http://localhost:5290'
};
