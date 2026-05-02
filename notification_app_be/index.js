const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYjgyNDFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzMxOCwiaWF0IjoxNzc3NzAyNDE4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNWNlMjU4NmUtNzkxMC00M2JkLWI0YTgtZTQ1OWFmOWVjZGM0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYm9tbWEgcm9oaXRoIHZlbmthdGEgcGF2YW4gc2FpIiwic3ViIjoiY2E5ZWNiNTctNTQ3Zi00ZDU3LTk4ZTAtMWI1ZWJjNDFiN2NlIn0sImVtYWlsIjoicmI4MjQxQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoiYm9tbWEgcm9oaXRoIHZlbmthdGEgcGF2YW4gc2FpIiwicm9sbE5vIjoicmEyMzExMDI2MDEwNzU1IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiY2E5ZWNiNTctNTQ3Zi00ZDU3LTk4ZTAtMWI1ZWJjNDFiN2NlIiwiY2xpZW50U2VjcmV0IjoiUFltdFVuVnlyVVpZc1BuSCJ9.M8YznvIx5SClWYvLoX_22Z-gDP3vvel1a8k4QFM1gSM";

const API = "http://20.207.122.201/evaluation-service/notifications";

// 🔹 Fetch notifications
async function getNotifications() {
  try {
    const res = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return res.data.notifications;
  } catch (err) {
    console.log("API ERROR:", err.response?.data || err.message);
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

// 🔹 Main
async function main() {
  const data = await getNotifications();

  if (!data.length) {
    console.log("No notifications ❌");
    return;
  }

  const top = processNotifications(data);

  console.log("\n===== TOP 10 NOTIFICATIONS =====\n");

  top.forEach((item, i) => {
    console.log(
      `${i + 1}. [${item.Type}] ${item.Message} → ${item.Timestamp}`
    );
  });
}

main();