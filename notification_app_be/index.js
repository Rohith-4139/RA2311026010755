const axios = require("axios");

// 🔥 ALWAYS use latest token (env or paste fresh)
const TOKEN = process.env.TOKEN || "PASTE_FRESH_TOKEN_HERE";

const API = "http://20.207.122.201/evaluation-service/notifications";

// 🔹 Fetch notifications
async function getNotifications() {
  try {
    if (!TOKEN || TOKEN.includes("PASTE")) {
      console.log("❌ Please set a valid token");
      return [];
    }

    console.log("Using Token:", TOKEN.substring(0, 20) + "...");

    const res = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return res.data.notifications || [];
  } catch (err) {
    console.log("❌ API ERROR:", err.response?.data || err.message);
    return [];
  }
}

// 🔹 Sort + Top 10
function processNotifications(data) {
  const priority = {
    Placement: 1,
    Event: 2,
    Result: 3,
  };

  return data
    .sort((a, b) => {
      if (priority[a.Type] !== priority[b.Type]) {
        return priority[a.Type] - priority[b.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
}

// 🔹 Display
function display(data) {
  console.log("\n===== TOP 10 NOTIFICATIONS =====\n");

  data.forEach((item, i) => {
    console.log(
      `${i + 1}. [${item.Type}] ${item.Message} → ${item.Timestamp}`
    );
  });
}

// 🔹 Main
async function main() {
  const data = await getNotifications();

  if (!data.length) {
    console.log("No notifications ❌");
    return;
  }

  const top = processNotifications(data);
  display(top);
}

main();