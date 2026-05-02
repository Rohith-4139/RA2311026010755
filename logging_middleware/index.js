const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

async function Log(stack, level, pkg, message, token) {
  try {
    await axios.post(
      LOG_API,
      {
<<<<<<< HEAD
        stack,
        level,
        package: pkg,
        message,
=======
        stack: stack,
        level: level,
        package: pkg,
        message: message,
>>>>>>> c1eab2738eacc1238d54f9cfcfcd8ee902ff2506
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log("Log error:", err.message);
  }
}

module.exports = Log;
