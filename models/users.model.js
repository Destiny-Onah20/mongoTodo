const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    default: false
  },
  todo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "todos"
  }]
}, {
  timestamps: true
});

const User = mongoose.model("users", userSchema);

module.exports = User;