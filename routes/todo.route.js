const express = require("express");
const { createTodo, done, allTodo, editTodo, deleteTodo, deleteDone, deleteAllTask } = require("../controllers/todo.control")

const todoFunc = express.Router();

todoFunc.route("/add/:userId").post(createTodo);
todoFunc.route("/done/:userId/:id").patch(done);
todoFunc.route("/todo").get(allTodo);
todoFunc.route("/edit/:userId/:todoId").patch(editTodo);
todoFunc.route("/delete/:userId/:todoId").delete(deleteTodo);
todoFunc.route("/deletedone").delete(deleteDone);
todoFunc.route("/alldelete").delete(deleteAllTask);

module.exports = todoFunc;