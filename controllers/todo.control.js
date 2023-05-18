const todoModel = require("../models/todo.model");

exports.createTodo = async(req,res)=>{
  try {
    // const { tasks } = req.body;
    const addTodo = await todoModel.create(req.body);
    return res.status(201).json({
      message: "Added new task.",
      data: addTodo
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.done = async(req,res)=>{
  try {
    const id = req.params.id;
    const turnTrue = await todoModel.findById(id);
    turnTrue.completed = true
    await turnTrue.save()
      return res.status(200).json({
        message: "This task has been completed.",
        data: turnTrue
      })
    
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.allTodo = async(req,res)=>{
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

exports.editTodo = async(req,res)=>{
  try {
    const todoId = req.params.todoId;
    const edited = await todoModel.findByIdAndUpdate(todoId, req.body);
      return res.status(200).json({
        message: "Task editted Successfully.",
        data: edited
      }) 
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.deleteTodo = async ( req , res ) => {
  try {
    const todoId = req.params.todoId;
    await todoModel.findByIdAndDelete(todoId) ;
    return res.status(200).json({
      message: "Deleted successfully",
  })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.deleteDone = async ( req , res ) => {
  try {
      await todoModel.deleteMany({completed: true});
      return res.status(200).json({
        message: "All done tasks deleted successfully"
      })

  } catch ( error ) {
    res.status(400).json({
      message: error.message
    })
  }
};

exports.deleteAllTask = async ( req , res ) => {
  try {
    await todoModel.deleteMany({all: true});
    res.status(200).json({
      message: "All tasks deleted."
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};