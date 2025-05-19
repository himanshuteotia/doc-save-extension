# 🚀 JobSaver Chrome Extension

A Chrome extension to help job seekers save job posts, emails, and opportunities from any website — in just one click. Organize and track job-related content efficiently in Notion.

---

## 📌 Overview

**JobSaver** is a lightweight browser extension that allows you to:
- Save selected job descriptions, emails, or LinkedIn posts
- Capture screenshots of job listings
- Store everything in a Notion database

---

## 🧩 Features

| Feature            | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| Save Selected Text | Highlight text on a job description/email → Right-click → Save to Notion |
| Screenshot Capture | Capture visible area of the page via browser action                      |
| Add Tags / Notes   | Label saved content like `Remote`, `Urgent`, `Follow Up`                 |
| Save Page Metadata | Page title and URL auto-included with the saved content                  |
| Notion Integration | Stores data in a structured Notion database via Notion API               |
| Optional Preview   | Saved items preview available via the extension popup                    |

---

## 🏗️ Tech Stack

- **Browser Extension:** JavaScript (ES6), HTML/CSS, Chrome Manifest V3
- **Screenshot API:** `chrome.tabs.captureVisibleTab()`
- **Notion Integration:** Notion API using Personal Access Token
- **Local Config:** `chrome.storage.local` to store preferences or Notion token

---

## 🔐 Required Permissions

- `activeTab`: To access current tab content
- `contextMenus`: Add right-click options
- `tabs`: To capture screenshots
- `scripting`: Inject scripts to extract text
- `storage`: Store Notion token locally

---

## 📝 Notion Database Structure

Create a database in Notion with these columns:

| Column      | Type         | Description                                      |
| ----------- | ------------ | ------------------------------------------------ |
| Title       | Text         | Job title or LinkedIn post heading               |
| Description | Text         | Selected text or note                            |
| Screenshot  | File         | Uploaded screenshot (optional)                   |
| Tags        | Multi-select | Labels like `Remote`, `Urgent`, `Referral`, etc. |
| Link        | URL          | Page URL where data was saved from               |

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/job-saver-extension.git
cd job-saver-extension
```

### 2. Add Extension Icons
Place your icons (`icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`) in the `assets/` folder.

### 3. Build/Prepare (No build step needed for vanilla JS)

### 4. Load in Chrome
- Go to `chrome://extensions/`
- Enable **Developer mode**
- Click **Load unpacked**
- Select the project folder

---

## 🛠️ Notion Setup Guide

### 1. Create a Notion Integration (Get Token)
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click **+ New integration**
3. Give it a name (e.g., JobSaver)
4. Select the workspace
5. Copy the **Internal Integration Token** (starts with `secret_...`)

### 2. Create a Notion Database
1. In Notion, create a new page
2. Add a **Database** (Table view recommended)
3. Add columns:
   - `Title` (Title)
   - `Description` (Text)
   - `Screenshot` (File, optional)
   - `Tags` (Multi-select)
   - `Link` (URL)
4. Click the three dots (•••) on the database → **Copy link to view**
   - The database ID is the long string in the URL after your workspace and before the `?` (e.g., `https://www.notion.so/yourworkspace/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...`)

### 3. Share Database with Integration
1. Open your database page
2. Click **Share** (top right)
3. Select your integration (e.g., JobSaver)
4. Click **Invite**

### 4. Configure Extension
1. Click the JobSaver extension icon in Chrome
2. Paste your Notion **token** and **database ID** in the config section
3. Click **Save Config**

---

## 💡 Usage

1. **Highlight** any job description, email, or LinkedIn post
2. **Right-click** → "Save to JobSaver"
3. Extension popup will show the selected text, page title, and URL
4. Optionally, add tags/notes or capture a screenshot
5. Click **Save to Notion**
6. Data will appear in your Notion database

---

## 📦 Folder Structure

```
/job-saver-extension
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── content.js
├── utils/
│   └── notion.js
├── assets/
│   └── icon16.png, ...
├── styles/
│   └── popup.css
```

---

## 🧑‍💻 Developer Notes
- Modular code, easy to extend for other backends (e.g., Firebase)
- Notion token and DB ID are stored securely in Chrome's local storage
- No sensitive keys are hardcoded
- For screenshot upload, Notion only supports external URLs (data URLs may not preview in Notion)

---

## ❓ Troubleshooting
- **Notion API errors:** Double-check your token, database ID, and integration sharing
- **No data in Notion:** Ensure the integration has access to the database
- **Screenshot not visible in Notion:** Notion may not preview data URLs; use a CDN for production
- **Extension not working:** Reload the extension in Chrome and check permissions

---

## 🙌 Credits
Made with ❤️ for job seekers by [Your Name].

---

## 🔗 Resources
- [Notion API Docs](https://developers.notion.com)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/) 