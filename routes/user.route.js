const { Router } = require("express");
const { register, getUserData, loginUser } = require("../controllers/users.controllers");

const userRoute = Router();

userRoute.route("/signup").post(register);
userRoute.route("/user/:userId").get(getUserData);
userRoute.route("/login").post(loginUser);
userRoute.route("/").get((req, res) => {
  res.send(
    `<a href="https://todo-list-ns19.onrender.com/api/todo">Register Now</a>`
  )
});


module.exports = userRoute;