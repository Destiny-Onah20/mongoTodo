const todoModel = require("../models/todo.model");
const userModel = require("../models/users.model")

exports.createTodo = async (req, res) => {
  console.log(req.file)
  try {
    const userId = req.params.userId;
    const theUser = await userModel.findById(userId);
    const data = new todoModel(req.body)
    data.user = theUser._id;
    await data.save()
    theUser.todo.push(data);
    await theUser.save();
    return res.status(201).json({
      message: "Added new task.",
      data: data
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.done = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const theTask = await todoModel.findById(id);
    if (theTask.user == userId) {
      theTask.completed = true
      await theTask.save()
      return res.status(200).json({
        message: "This task has been completed.",
        data: theTask
      })
    } else {
      return res.status(400).json({
        message: "Not authorized."
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.allTodo = async (req, res) => {
  try {
    const all = await todoModel.find();
    res.status(200).json({
      message: "All todo",
      length: all.length,
      data: all
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.editTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.params.userId;
    const theTaskToUpdate = await todoModel.findById(todoId);
    if (theTaskToUpdate.user == userId) {
      const edited = await todoModel.findByIdAndUpdate(todoId, req.body);
      return res.status(200).json({
        message: "Task editted Successfully.",
        data: edited
      })
    } else {
      return res.status(400).json({
        message: "Not authorized."
      })
    }

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const theTaskToDelete = await todoModel.findById(todoId);
    if (theTaskToDelete.user == userId) {
      await todoModel.findByIdAndDelete(todoId);
      return res.status(200).json({
        message: "Deleted successfully",
      })
    } else {
      return res.status(400).json({
        message: "Not authorized."
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.deleteDone = async (req, res) => {
  try {

    await todoModel.deleteMany({ completed: true });
    return res.status(200).json({
      message: "All done tasks deleted successfully"
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.deleteAllTask = async (req, res) => {
  try {

    await todoModel.deleteMany({ all: true });
    res.status(200).json({
      message: "All tasks deleted."
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

