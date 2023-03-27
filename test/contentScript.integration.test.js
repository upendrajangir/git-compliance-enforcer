describe("Content Script Integration Test", () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.stub(console, "warn");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should block file uploads on a blocked site", () => {
    const fileInputs = [
      { addEventListener: sinon.spy() },
      { addEventListener: sinon.spy() },
    ];

    sandbox.stub(document, "querySelectorAll").returns(fileInputs);

    chrome.storage.sync.get.yields({ blockedSites: ["https://blocked.com"] });
    init();

    expect(fileInputs[0].addEventListener.calledOnce).to.be.true;
    expect(fileInputs[1].addEventListener.calledOnce).to.be.true;
  });

  it("should block copy on a blocked site", () => {
    sandbox.stub(document, "addEventListener");

    chrome.storage.sync.get.yields({ blockedSites: ["https://blocked.com"] });
    init();

    expect(document.addEventListener.calledOnce).to.be.true;
  });

  it("should not block file uploads on a non-blocked site", () => {
    const fileInputs = [
      { addEventListener: sinon.spy() },
      { addEventListener: sinon.spy() },
    ];

    sandbox.stub(document, "querySelectorAll").returns(fileInputs);

    chrome.storage.sync.get.yields({ blockedSites: ["https://allowed.com"] });
    init();

    expect(fileInputs[0].addEventListener.called).to.be.false;
    expect(fileInputs[1].addEventListener.called).to.be.false;
  });

  it("should not block copy on a non-blocked site", () => {
    sandbox.stub(document, "addEventListener");

    chrome.storage.sync.get.yields({ blockedSites: ["https://allowed.com"] });
    init();

    expect(document.addEventListener.called).to.be.false;
  });
});
