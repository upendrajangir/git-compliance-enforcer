document.getElementById('saveButton').addEventListener('click', () => {
    const blockedSites = document.getElementById('blockedSites').value.split('\n').filter((site) => site.trim());
  
    chrome.storage.sync.set({ blockedSites }, () => {
      const status = document.getElementById('status');
      status.textContent = '__MSG_optionsSaved__
      setTimeout(() => {
        status.textContent = '';
      }, 1000);
    });
  });
  
  // Load the current blocked sites list
  chrome.storage.sync.get('blockedSites', (data) => {
    const blockedSites = data.blockedSites || [];
    document.getElementById('blockedSites').value = blockedSites.join('\n');
  });
  
  // Internationalization support
  const localize = () => {
    document.title = chrome.i18n.getMessage('optionsTitle');
    document.getElementById('blockedSites').setAttribute('placeholder', chrome.i18n.getMessage('optionsPlaceholder'));
    document.getElementById('saveButton').textContent = chrome.i18n.getMessage('optionsSaveButton');
    document.getElementById('status').textContent = chrome.i18n.getMessage('optionsStatus');
  };
  
  // Initialize the extension
  document.addEventListener('DOMContentLoaded', () => {
    localize();
  });
    