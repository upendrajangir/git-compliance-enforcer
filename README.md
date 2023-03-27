# Git Compliance Enforcer

This repository contains two tools that can help enforce good coding practices in your organization's Git repositories: a batch script that restricts developers from committing or pushing code to Git, and a Google Chrome extension that prevents code uploads and copying from specific websites.

## Usage

### Batch Script

To use the batch script, simply run the `enforce_git_hooks.bat` file on the machine(s) where you want to enforce the Git Compliance Enforcer. This will create a directory to store global Git hooks, create two hook scripts that prevent committing and pushing, set executable permissions for the hook scripts, and configure the global Git hooks. 

Once the setup is complete, Git commits and pushes will be blocked on the machine(s) where the batch script was run. 

To remove the Git Compliance Enforcer, simply run the `teardown_git_hooks.bat` file on the same machine(s).

### Google Chrome Extension

To use the Google Chrome extension, simply install it from the Chrome Web Store or load it as an unpacked extension. Once the extension is installed, it will block file uploads and copying from any websites that are added to the blocked sites list in the extension options.

To add or remove blocked sites, open the extension options and enter the URLs of the websites to block, separated by new lines. 

## Contributing

If you have any suggestions or improvements for either tool, feel free to submit a pull request or create an issue on the repository.

## License

This repository is licensed under the [MIT License](LICENSE).
