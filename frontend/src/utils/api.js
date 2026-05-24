import axios from "axios";

async function getTodos() {
  let response = await axios.get("http://localhost:8000/get-todos");
  return response.data;
}

async function createTodo(body) {
  let response = await axios.post("http://localhost:8000/create-todo", body);
  return response.data;
}

async function updateTodo(body) {
  let response = await axios.put("http://localhost:8000/update-todo", body);
  return response.data;
}

async function deleteTodo(body) {
  let response = await axios.delete("http://localhost:8000/delete-todo",{
    data: body
  });
  return response.data;
}

export default {
  getTodos: getTodos,
  createTodo: createTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
