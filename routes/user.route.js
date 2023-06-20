const { Router } = require("express");
const { register, getUserData, loginUser } = require("../controllers/users.controllers");

const userRoute = Router();

userRoute.route("/signup").post(register);
userRoute.route("/user/:userId").get(getUserData);
userRoute.route("/login").post(loginUser);

module.exports = userRoute;