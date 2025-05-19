// Save job data to Notion database using Notion API
async function saveToNotion({
  token,
  db,
  title,
  desc,
  url,
  tags,
  notes,
  screenshot,
}) {
  // Prepare Notion API payload
  const properties = {
    Title: {
      title: [
        {
          text: { content: title || "Untitled Job" },
        },
      ],
    },
    Description: {
      rich_text: [
        {
          text: { content: desc + (notes ? "\nNotes: " + notes : "") },
        },
      ],
    },
    Link: {
      url: url,
    },
    Tags: {
      multi_select: tags.map((t) => ({ name: t })),
    },
  };

  // Screenshot as file is tricky; for MVP, add as external file if possible
  let children = [];
  if (screenshot) {
    children.push({
      object: "block",
      type: "image",
      image: {
        type: "external",
        external: { url: screenshot },
      },
    });
  }

  const body = {
    parent: { database_id: db },
    properties,
    children: children.length ? children : undefined,
  };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to save to Notion");
  }
}

// Expose globally for popup.js
if (typeof window !== "undefined") {
  window.saveToNotion = saveToNotion;
}
