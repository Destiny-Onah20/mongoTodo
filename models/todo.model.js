const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  tasks: {
    type: String,
    require: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  all: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;