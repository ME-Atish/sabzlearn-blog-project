const svgCaptcha = require("svg-captcha");
const uuidV4 = require("uuid").v4;

const redis = require("../redis");

exports.get = async (req, res, next) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 5,
  });
  
  const uuid = uuidV4();

  redis.set(`captcha:${uuid}`, captcha.text, "EX", 60 * 5);

  res.json({
    uuid,
    captcha: captcha.data,
  });
};
