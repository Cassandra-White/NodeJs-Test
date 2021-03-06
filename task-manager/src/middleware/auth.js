const jwt = require("jsonwebtoken");
// require('dotenv').config()
const authToken = process.env.AUTH_TOKEN
const { findOne } = require("../schema/User");
const UserModel = require("../schema/User");

const auth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, authToken);
    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    request.token = token;
    request.user = user;
    next();
  } catch (error) {
    response.status(401).send({ message: "Connectez-vous !" });
  }
};

module.exports = auth;
