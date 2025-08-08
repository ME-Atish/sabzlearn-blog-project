const db = require("./db");
const app = require("./app");
const configs = require("./config");
const redis = require("./redis");

async function startServer() {
  try {
    await db.authenticate();
    await redis.ping();

    app.listen(configs.port, () => {
      console.log(`Listening to port ${configs.port}`);
    });
  } catch (error) {
    await db.close();
    await redis.disconnect();
  }
}

startServer();
