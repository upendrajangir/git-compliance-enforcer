const { JSDOM } = require("jsdom");
const sinon = require("sinon");
const {
  preventDefaultHandler,
  blockFileUploads,
  blockCopy,
} = require("./example.js");

describe("preventDefaultHandler", () => {
  it("should prevent the default event and stop propagation", () => {
    // Set up a test event
    const e = {
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
    };

    // Call the function with the test event
    preventDefaultHandler(e);

    // Use sinon assertions to check the result
    sinon.assert.calledOnce(e.preventDefault);
    sinon.assert.calledOnce(e.stopPropagation);
    console.assert(
      console.warn.calledWith("Uploading or copying code is not allowed.")
    );
  });
});

describe("blockFileUploads", () => {
  let dom;

  beforeEach(() => {
    // Create a new JSDOM instance with a file input element
    dom = new JSDOM(`
      <html>
        <body>
          <input type="file" />
        </body>
      </html>
    `);
  });

  it("should block file uploads for all file input elements on the page", () => {
    // Use the JSDOM instance to access the document object
    global.document = dom.window.document;

    // Spy on the preventDefaultHandler function
    const spy = sinon.spy(preventDefaultHandler);

    // Call the blockFileUploads function and trigger a file input change event
    blockFileUploads();
    const fileInput = document.querySelector("input[type='file']");
    fileInput.dispatchEvent(new Event("change"));

    // Use sinon assertions to check the result
    sinon.assert.calledOnce(spy);
  });

  afterEach(() => {
    // Clean up the JSDOM instance to prevent memory leaks
    dom.window.close();
  });
});

describe("blockCopy", () => {
  let dom;

  beforeEach(() => {
    // Create a new JSDOM instance
    dom = new JSDOM(`
      <html>
        <body>
          <p>This is some text.</p>
        </body>
      </html>
    `);
  });

  it("should block copy events for the entire page", () => {
    // Use the JSDOM instance to access the document object
    global.document = dom.window.document;

    // Spy on the preventDefaultHandler function
    const spy = sinon.spy(preventDefaultHandler);

    // Call the blockCopy function and trigger a copy event
    blockCopy();
    const selection = dom.window.getSelection();
    selection.selectAllChildren(document.querySelector("p"));
    document.execCommand("copy");

    // Use sinon assertions to check the result
    sinon.assert.calledOnce(spy);
  });

  afterEach(() => {
    // Clean up the JSDOM instance to prevent memory leaks
    dom.window.close();
  });
});
