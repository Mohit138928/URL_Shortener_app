@echo off
echo Installing URL Shortener App Dependencies...
echo.

echo [1/3] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b %errorlevel%
)

cd ..
echo.
echo [3/3] Setup complete!
echo.
echo To start the application:
echo 1. Start backend: cd backend && npm run dev
echo 2. Start frontend: npm run dev
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
pause
