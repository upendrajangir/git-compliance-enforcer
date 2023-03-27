chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "greeting") {
    sendResponse({ greeting: "Hello, world!" });
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: "https://www.google.com" });
});
