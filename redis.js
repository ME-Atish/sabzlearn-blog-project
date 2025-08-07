const { Redis } = require("ioredis");

const config = require("./config");

const redis = new Redis(config.redis.uri);

const redisTest = async () => {
  // const data = await redis.keys("*");
  // console.log(data);
  // const insertData = await redis.set("title", "nodejs");
  //   const getSpecificData = await redis.get("title");
  //   console.log(getSpecificData);
  //   await redis.del("title");
  //   console.log("ok")
};

redisTest();

module.exports = redis;
