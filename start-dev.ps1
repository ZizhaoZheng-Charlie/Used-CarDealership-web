# PowerShell script to start all development services
# Usage: .\start-dev.ps1

Write-Host "Starting AlexWeb Development Environment..." -ForegroundColor Green
Write-Host ""

# Start Backend in a new window
Write-Host "Starting Backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Backend; npm run dev" -WindowStyle Normal

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Start Frontend in a new window
Write-Host "Starting Frontend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Frontend; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "All services are starting in separate windows." -ForegroundColor Green
Write-Host "Backend: http://localhost:3001 (default port)" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173 (default Vite port)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this script (services will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

