// Utility to get/set config from chrome.storage
function getConfig(callback) {
  chrome.storage.local.get(["notion_token", "notion_db"], (data) => {
    callback(data.notion_token || "", data.notion_db || "");
  });
}

function setConfig(token, db, callback) {
  chrome.storage.local.set({ notion_token: token, notion_db: db }, callback);
}

// Load preview data
chrome.storage.local.get(["jobsaver_temp"], (data) => {
  if (data.jobsaver_temp) {
    document.getElementById("job-title").innerText =
      data.jobsaver_temp.title || "";
    document.getElementById("job-desc").innerText =
      data.jobsaver_temp.selection || "";
    document.getElementById("job-url").innerText = data.jobsaver_temp.url || "";
  }
});

// Save config
const saveConfigBtn = document.getElementById("save-config");
saveConfigBtn.addEventListener("click", () => {
  const token = document.getElementById("notion-token").value;
  const db = document.getElementById("notion-db").value;
  setConfig(token, db, () => {
    document.getElementById("status").innerText = "Config saved!";
    setTimeout(() => (document.getElementById("status").innerText = ""), 1500);
  });
});

// Screenshot capture
const captureBtn = document.getElementById("capture-btn");
captureBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "captureScreenshot" }, (response) => {
    if (response && response.screenshot) {
      const img = document.getElementById("screenshot-preview");
      img.src = response.screenshot;
      img.style.display = "block";
      img.dataset.screenshot = response.screenshot;
    }
  });
});

// Save to Notion
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  getConfig(async (token, db) => {
    if (!token || !db) {
      document.getElementById("status").innerText =
        "Please set Notion token and DB ID!";
      return;
    }
    const title = document.getElementById("job-title").innerText;
    const desc = document.getElementById("job-desc").innerText;
    const url = document.getElementById("job-url").innerText;
    const tags = document
      .getElementById("tags")
      .value.split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const notes = document.getElementById("notes").value;
    const screenshot =
      document.getElementById("screenshot-preview").dataset.screenshot || null;
    document.getElementById("status").innerText = "Saving...";
    try {
      await saveToNotion({
        token,
        db,
        title,
        desc,
        url,
        tags,
        notes,
        screenshot,
      });
      document.getElementById("status").innerText = "Saved to Notion!";
      setTimeout(
        () => (document.getElementById("status").innerText = ""),
        1500
      );
    } catch (e) {
      document.getElementById("status").innerText = "Error saving to Notion!";
    }
  });
});

// Import Notion API logic
// Assumes saveToNotion is exposed globally by utils/notion.js
