export const environment = {
  production: false,
  // Backend Wiego (.NET). Routes are root-absolute (no /api prefix).
  //   docker compose up               -> http://localhost:8080  (default)
  //   dotnet run --project Wiego.Api  -> http://localhost:5290
  apiUrl: 'http://localhost:8080'
};
