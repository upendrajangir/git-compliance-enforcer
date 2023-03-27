@echo off

REM Check if the script is running with administrative privileges
net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] The script must be run with administrative privileges.
    exit /B 1
) else (
    echo The script is running with administrative privileges.
)

REM Set the hooks directory path
set HOOKS_DIR=C:\CommonGitHooks

echo Removing the common Git hooks directory...

REM Remove the common Git hooks directory if it exists
if exist "!HOOKS_DIR!" (
    rmdir /s /q "!HOOKS_DIR!"
    if errorlevel 1 (
        echo [ERROR] Failed to remove the common Git hooks directory.
        exit /B 1
    )
)

echo Removing the Git hooks path for all users...

REM Remove the Registry entry that enforces the Git hooks configuration for all users
reg delete "HKLM\Software\GitForWindows" /v "core.hooksPath" /f
if errorlevel 1 (
    echo [ERROR] Failed to remove the Git hooks path for all users.
    exit /B 1
)

echo The common Git hooks have been removed, and the default behavior has been restored for all users.
