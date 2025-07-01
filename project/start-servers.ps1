# GameZone Manager - Démarrage des serveurs
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "GameZone Manager - Démarrage" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Démarrage du serveur backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "Set-Location '$PSScriptRoot\backend'; npm run dev; Read-Host 'Appuyez sur Entrée pour fermer'"

Start-Sleep -Seconds 3

Write-Host "Démarrage du serveur frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "Set-Location '$PSScriptRoot'; npm run dev; Read-Host 'Appuyez sur Entrée pour fermer'"

Write-Host ""
Write-Host "Les serveurs sont en cours de démarrage..." -ForegroundColor Green
Write-Host "Backend: http://localhost:3001" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Appuyez sur une touche pour fermer cette fenêtre..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
