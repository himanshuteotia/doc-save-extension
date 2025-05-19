// Listen for messages from background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectionAndMeta") {
    const selection = window.getSelection().toString();
    const title = document.title;
    const url = window.location.href;
    sendResponse({
      selection,
      title,
      url,
    });
  }
});
