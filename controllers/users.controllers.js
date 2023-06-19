const userModel = require("../models/user.model");
const bcrypt = require("bcrypt")


exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const authUser = await userModel.findOne({ username });
    if (authUser) {
      return res.status(400).json({
        message: "Username already exists."
      })
    } else {
      const saltPassword = await bcrypt.genSalt(10);
      const hassPassord = await bcrypt.hash(password, saltPassword);
      const createUser = await userModel.create({
        username,
        password: hassPassord
      });
      return res.status(201).json({
        message: "User created.",
        data: createUser
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const theUser = await userModel.findById(userId).populate("todo");
    return res.status(200).json({
      length: theUser.todo.length,
      data: theUser.todo,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const authUser = await userModel.findOne({ username });
    if (!authUser) {
      return res.status(400).json({
        message: "Username Does not exists."
      })
    }
    const checkPassword = await bcrypt.compare(password, authUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Username or password Does not exists."
      })
    }
    return res.status(200).json({
      message: "Successful.",
      data: authUser
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}