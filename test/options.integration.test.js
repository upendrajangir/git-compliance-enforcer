describe('Options Integration Tests', () => {
    describe('Save options', () => {
      beforeEach(() => {
        document.body.innerHTML = `
          <textarea id="blockedSites"></textarea>
          <button id="saveButton"></button>
          <div id="status"></div>
        `;
      });
  
      it('should save options and show status message', () => {
        const blockedSites = 'example.com\ntest.com';
        const input = document.querySelector('#blockedSites');
        const button = document.querySelector('#saveButton');
        const status = document.querySelector('#status');
  
        input.value = blockedSites;
        button.click();
  
        expect(status.textContent).toEqual('__MSG_optionsSaved__');
        expect(chrome.storage.sync.set).toHaveBeenCalledWith(
          { blockedSites },
          jasmine.any(Function)
        );
      });
    });
  
    describe('Load options', () => {
      beforeEach(() => {
        document.body.innerHTML = `
          <textarea id="blockedSites"></textarea>
          <button id="saveButton"></button>
          <div id="status"></div>
        `;
      });
  
      it('should load options from storage', () => {
        const blockedSites = 'example.com\ntest.com';
        chrome.storage.sync.get.and.callFake((key, callback) => {
          callback({ blockedSites });
        });
  
        expect(chrome.storage.sync.get).toHaveBeenCalledWith(
          'blockedSites',
          jasmine.any(Function)
        );
        expect(document.querySelector('#blockedSites').value).toEqual(blockedSites);
      });
    });
  
    describe('Localization', () => {
      beforeEach(() => {
        document.body.innerHTML = `
          <textarea id="blockedSites"></textarea>
          <button id="saveButton"></button>
          <div id="status"></div>
        `;
      });
  
      it('should set the text content of elements', () => {
        localize();
  
        expect(document.title).toEqual(chrome.i18n.getMessage('optionsTitle'));
        expect(document.querySelector('#blockedSites').getAttribute('placeholder')).toEqual(
          chrome.i18n.getMessage('optionsPlaceholder')
        );
        expect(document.querySelector('#saveButton').textContent).toEqual(
          chrome.i18n.getMessage('optionsSaveButton')
        );
        expect(document.querySelector('#status').textContent).toEqual(
          chrome.i18n.getMessage('optionsStatus')
        );
      });
    });
  });
  