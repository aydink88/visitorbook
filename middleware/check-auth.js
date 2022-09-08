const jwt = require("jsonwebtoken");

const ErrorResponse = require("../utils/error-response");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    //const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return next(new ErrorResponse("Authentication failed.", 403));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Authentication failed.", 403));
  }
};
