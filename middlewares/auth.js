const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(409).json({ message: "Please Login First" });
  } else {
    try {
      const deCodeToken = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY
      );
      req.role = deCodeToken.role;
      req.id = deCodeToken.id;
      next();
    } catch (error) {
      // console.log(error);
      return res.status(409).json({ message: "Please Login First" });
    }
  }
};

const isLoggedInCustomer = async (req, res, next) => {
  const { customerToken } = req.cookies;

  if (!customerToken) {
    return res.status(409).json({ message: "Please Login First" });
  } else {
    try {
      const deCodeToken = await jwt.verify(
        customerToken,
        process.env.JWT_SECRET_KEY
      );
      req.id = deCodeToken.id;
      next();
    } catch (error) {
      // console.log(error);
      return res.status(409).json({ message: "Please Login First" });
    }
  }
};

module.exports = {
  isLoggedIn,
  isLoggedInCustomer,
};
