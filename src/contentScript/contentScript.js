function preventDefaultHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  console.warn("Uploading or copying code is not allowed.");
}

function blockFileUploads() {
  try {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.addEventListener("change", preventDefaultHandler, false);
    });
  } catch (error) {
    console.error("Error while blocking file uploads:", error);
  }
}

function blockCopy() {
  try {
    document.addEventListener("copy", preventDefaultHandler, false);
  } catch (error) {
    console.error("Error while blocking copy events:", error);
  }
}

function init() {
  chrome.storage.sync.get("blockedSites", (data) => {
    const blockedSites = data.blockedSites || [];
    const currentURL = window.location.href;

    for (const site of blockedSites) {
      if (currentURL.startsWith(site)) {
        blockFileUploads();
        blockCopy();
        break;
      }
    }
  });
}

init();
