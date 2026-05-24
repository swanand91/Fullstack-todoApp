const express = require("express");
const router = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo.controller");

router.get("/get-todos", getTodos);
router.post("/create-todo", createTodo);
router.put("/update-todo", updateTodo);
router.delete("/delete-todo", deleteTodo);

module.exports = router;