const db = require("../config/db");

exports.getTodos = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos order by id desc");
    res.send(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  const body = req.body;
  try {
    if (!body.title) {
      throw new Error("Title is required");
    }
    let query = `insert into todos (title) values ('${body.title}');`;
    const result = await db.query(query);
    res.send({
      msg: "Todo created successfully",
    });
  } catch (err) {
    console.log("check", err);
    res.send({
      msg: "Todo creation failed",
    });
  }
};

exports.updateTodo = async (req, res) => {
  const { id, title, status } = req.body;
  try {
    // how to handle if title come then update title and if status come then update status and if both come then update both
    let query = `update todos set title ='${title}' , status =${status} where id =${id};`;
    await db.query(query);
    res.send({
      msg: "Todo updated successfully",
    });
  } catch (err) {
    console.log("update error", err);
    res.send({
      msg: "Todo update failed",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.body;
  try {
    let query = `DELETE FROM todos WHERE id = ${id}`;
    await db.query(query);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
