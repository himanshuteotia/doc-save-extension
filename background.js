// Context menu creation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-to-jobsaver",
    title: "Save to JobSaver",
    contexts: ["selection"],
  });
});

// Listen for context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "save-to-jobsaver") {
    // Send message to content script to get selected text and metadata
    chrome.tabs.sendMessage(
      tab.id,
      { action: "getSelectionAndMeta" },
      (response) => {
        chrome.runtime.sendMessage({
          action: "openPopupWithData",
          data: response,
        });
      }
    );
  }
});

// Listen for screenshot request from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureScreenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      sendResponse({ screenshot: dataUrl });
    });
    return true; // async response
  }
});

// Forward data to popup when context menu is used
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openPopupWithData") {
    // Store data in chrome.storage for popup to access
    chrome.storage.local.set({ jobsaver_temp: request.data }, () => {
      // Optionally, you can trigger popup open here if needed
    });
  }
});
