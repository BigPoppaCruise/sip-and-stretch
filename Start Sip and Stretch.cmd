@echo off
rem Double-click to run the Sip & Stretch class with the latest version.
cd /d "%~dp0"

where git >nul 2>&1
if errorlevel 1 goto :launch

git diff --quiet 2>nul
if errorlevel 1 (
  echo.
  echo  *****************************************************************
  echo  *  WARNING: this copy has LOCAL EDITS not saved to GitHub.      *
  echo  *  Starting the class anyway with your local version.           *
  echo  *  Afterwards, ask Claude: "help me sync sip-and-stretch".      *
  echo  *****************************************************************
  echo.
  timeout /t 6 >nul
  goto :launch
)

echo Getting the latest version...
git checkout main >nul 2>&1
git pull --ff-only origin main

:launch
start "" "dist\index.html"
