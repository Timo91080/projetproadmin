@echo off
echo =================================
echo GameZone Manager - Démarrage
echo =================================
echo.

echo Démarrage du serveur backend...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Démarrage du serveur frontend...
start "Frontend Server" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo Les serveurs sont en cours de démarrage...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause >nul
