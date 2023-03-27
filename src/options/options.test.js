const { JSDOM } = require("jsdom");
const sinon = require("sinon");
const { saveButton, localize } = require("./example.js");

describe("saveButton", () => {
  let dom, spy;

  beforeEach(() => {
    // Create a new JSDOM instance with a save button and blocked sites textarea
    dom = new JSDOM(`
      <html>
        <body>
          <textarea id="blockedSites"></textarea>
          <button id="saveButton"></button>
          <div id="status"></div>
        </body>
      </html>
    `);

    // Use the JSDOM instance to access the document object
    global.document = dom.window.document;

    // Spy on the chrome.storage.sync.set method
    spy = sinon.spy(chrome.storage.sync, "set");
  });

  it("should save the current blocked sites list to chrome storage", () => {
    // Set the value of the blocked sites textarea and click the save button
    const blockedSitesTextarea = document.getElementById("blockedSites");
    blockedSitesTextarea.value = "https://example.com\nhttps://example.org\n";
    const saveButton = document.getElementById("saveButton");
    saveButton.click();

    // Use sinon assertions to check the result
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(
      spy,
      { blockedSites: ["https://example.com", "https://example.org"] },
      sinon.match.func
    );
  });

  afterEach(() => {
    // Restore the original chrome.storage.sync.set method
    spy.restore();

    // Clean up the JSDOM instance to prevent memory leaks
    dom.window.close();
  });
});

describe("localize", () => {
  let dom;

  beforeEach(() => {
    // Create a new JSDOM instance with several HTML elements
    dom = new JSDOM(`
      <html>
        <head>
          <title></title>
        </head>
        <body>
          <textarea id="blockedSites" placeholder=""></textarea>
          <button id="saveButton">Save</button>
          <div id="status"></div>
        </body>
      </html>
    `);

    // Use the JSDOM instance to access the document object
    global.document = dom.window.document;

    // Set up the chrome.i18n.getMessage method to return the input string
    sinon.stub(chrome.i18n, "getMessage").callsFake((input) => input);
  });

  it("should replace text in HTML elements with localized strings", () => {
    // Call the localize function and check that the HTML elements have been updated
    localize();
    console.assert(document.title === "optionsTitle");
    console.assert(
      document.getElementById("blockedSites").getAttribute("placeholder") ===
        "optionsPlaceholder"
    );
    console.assert(
      document.getElementById("saveButton").textContent === "optionsSaveButton"
    );
    console.assert(
      document.getElementById("status").textContent === "optionsStatus"
    );
  });

  afterEach(() => {
    // Restore the original chrome.i18n.getMessage method
    chrome.i18n.getMessage.restore();

    // Clean up the JSDOM instance to prevent memory leaks
    dom.window.close();
  });
});
