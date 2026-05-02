const axios = require("axios");
const Log = require("../logging_middleware");

// 🔑 Paste your token here OR use environment variable
const TOKEN = process.env.TOKEN || "PASTE_YOUR_ACCESS_TOKEN_HERE";

const API = "http://20.207.122.201/evaluation-service/notifications";

// ✅ Fetch notifications
async function getNotifications() {
  try {
    const res = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    await Log("backend", "info", "api", "Fetched notifications", TOKEN);

    return res.data.notifications || [];
  } catch (err) {
    console.log("API ERROR:", err.response?.data || err.message);
    await Log("backend", "error", "api", "Failed to fetch notifications", TOKEN);
    return [];
  }
}

// ✅ Sort + take top 10
function processNotifications(data) {
  const priority = {
    Placement: 1,
    Event: 2,
    Result: 3,
  };

  return data
    .sort((a, b) => {
      // Priority first
      if (priority[a.Type] !== priority[b.Type]) {
        return priority[a.Type] - priority[b.Type];
      }

      // If same type → latest first
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
}

// ✅ Main function
async function main() {
  const data = await getNotifications();

  if (!data.length) {
    console.log("No notifications ❌");
    return;
  }

  const top = processNotifications(data);

  console.log("\n===== TOP 10 NOTIFICATIONS =====\n");

  top.forEach((n, i) => {
    console.log(
      `${i + 1}. [${n.Type}] ${n.Message} → ${n.Timestamp}`
    );
  });

  await Log("backend", "info", "handler", "Displayed notifications", TOKEN);
}

main();