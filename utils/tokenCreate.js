const jwt = require("jsonwebtoken");

const createToken = async (data) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: data.rembember ? "30d" : "1d",
  });
  return token;
};

module.exports = createToken;
