import { expect } from "chai";
import sinon from "sinon";

import { blockFileUploads, blockCopy, init } from "../src/background";

describe("Background script", () => {
  let event;
  let storage;
  let storageStub;

  beforeEach(() => {
    // Create a fake event object
    event = {
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
    };

    // Create a fake storage object
    storage = {
      blockedSites: ["https://blocked-site.com"],
    };

    // Create a stub for the storage.sync.get method
    storageStub = sinon
      .stub(chrome.storage.sync, "get")
      .callsFake((_, callback) => {
        callback(storage);
      });
  });

  afterEach(() => {
    // Restore the storage.sync.get method
    storageStub.restore();
  });

  it("should block file uploads on blocked sites", () => {
    // Create a fake file input element
    const input = document.createElement("input");
    input.type = "file";

    // Add the file input element to the DOM
    document.body.appendChild(input);

    // Call the blockFileUploads function
    blockFileUploads();

    // Trigger the change event on the file input element
    input.dispatchEvent(new Event("change"));

    // Assert that the preventDefault and stopPropagation methods were called
    expect(event.preventDefault.calledOnce).to.be.true;
    expect(event.stopPropagation.calledOnce).to.be.true;

    // Remove the file input element from the DOM
    document.body.removeChild(input);
  });

  it("should block copy events on blocked sites", () => {
    // Create a fake clipboard event
    const clipboardEvent = new ClipboardEvent("copy");

    // Call the blockCopy function
    blockCopy();

    // Trigger the copy event on the document
    document.dispatchEvent(clipboardEvent);

    // Assert that the preventDefault and stopPropagation methods were called
    expect(event.preventDefault.calledOnce).to.be.true;
    expect(event.stopPropagation.calledOnce).to.be.true;
  });

  it("should initialize on options page load", () => {
    // Create a fake options page URL
    const url = "chrome-extension://extension-id/options.html";

    // Set the current URL to the fake options page URL
    Object.defineProperty(window.location, "href", { value: url });

    // Call the init function
    init();

    // Assert that the storage.sync.get method was called
    expect(storageStub.calledOnce).to.be.true;
  });
});
