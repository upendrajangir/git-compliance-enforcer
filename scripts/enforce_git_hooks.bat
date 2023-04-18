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

echo Creating the common Git hooks directory...

REM Create a directory to store common Git hooks
if not exist "%HOOKS_DIR%" (
    mkdir "%HOOKS_DIR%"
    if errorlevel 1 (
        echo [ERROR] Failed to create the common Git hooks directory.
        exit /B 1
    )
)

echo Creating and configuring the hook scripts...

REM Create and write the content for the pre-commit file
echo #!/bin/sh > "%HOOKS_DIR%\pre-commit"
echo echo "Committing is not allowed on this machine. Please contact your administrator for assistance." >> "%HOOKS_DIR%\pre-commit"
echo exit 1 >> "%HOOKS_DIR%\pre-commit"

REM Create and write the content for the pre-push file
echo #!/bin/sh > "%HOOKS_DIR%\pre-push"
echo echo "Pushing is not allowed on this machine. Please contact your administrator for assistance." >> "%HOOKS_DIR%\pre-push"
echo exit 1 >> "%HOOKS_DIR%\pre-push"

echo Setting the Git hooks path for all users...

REM Create or update the Registry entry to enforce the Git hooks configuration for all users
reg add "HKLM\SOFTWARE\GitForWindows\CurrentVersion" /v "CoreHooksPath" /t REG_SZ /d "%HOOKS_DIR%" /f
if errorlevel 1 (
    echo [ERROR] Failed to set the Git hooks path for all users.
    exit /B 1
)

git config --global core.hooksPath "%HOOKS_DIR%"
if errorlevel 1 (
    echo [ERROR] Failed to set the Git hooks path for all users.
    exit /B 1
)

echo Configuring the ACL for the hooks directory...

REM Set the ACL for the hooks directory to read-only for all existing and future users
icacls "%HOOKS_DIR%" /inheritance:r /T
icacls "%HOOKS_DIR%" /grant:r *S-1-1-0:(RX) /T
