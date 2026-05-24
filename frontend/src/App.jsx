import { useState,useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import "./App.css";
import api from "./utils/api";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // For dialog4

  useEffect(()=>{
    fetchTodo();
  },[])

  async function fetchTodo(){
    let data =await api.getTodos();
    setTasks([...data])
  }


  // Add OR Update Task
  const addOrUpdateTask = async () => {
    if (task.trim() === "") return;

    if (editId) {

      let body={
        id: editId,
        title:task,
        status:false,
      }
      let data = await api.updateTodo(body)
      console.log(data)
      fetchTodo();
    } else {
      let body={
        title: task
      }
      let data = await api.createTodo(body)
      console.log(data)
      fetchTodo();
    }

    setTask("");
  };

  // Open Delete Dialog
  const openDeleteDialog = (id) => {
    setDeleteId(id);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    let body={
      id:deleteId
    }
    console.log(body)
    let data= await api.deleteTodo(body);
    console.log(data)
    fetchTodo();
      setDeleteId(null);
      
  };

  // Cancel Delete
  const cancelDelete = () => {
    setDeleteId(null);
  };

  // Toggle Complete
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setTasks(updatedTasks);
  };

  // Edit Task
  const editTask = (id) => {
    const selectedTask = tasks.find((item) => item.id === id);
    setTask(selectedTask.title);
    setEditId(id);
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditId(null);
    setTask("");
  };

  // Clear All
  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Todo App</h2>

        <div className="input-section">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addOrUpdateTask}>
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button className="cancel-btn" onClick={cancelEdit}>
              <FaTimes />
            </button>
          )}
        </div>

        {tasks.map((item) => (
          <div key={item.id} className="task">
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => toggleTask(item.id)}
            />

            <span className={item.status ? "completed" : ""}>
              {item.title}
            </span>

            <div className="btn-group">
              <button onClick={() => editTask(item.id)}>
                <FaEdit />
              </button>

              <button onClick={() => openDeleteDialog(item.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {tasks.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      {/* 🔥 Custom Delete Dialog */}
      {deleteId && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>Are you sure you want to delete this task?</p>
            <div className="dialog-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;