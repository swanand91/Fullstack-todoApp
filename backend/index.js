const express= require('express');
const cors= require('cors');
const todoRouter= require('./routers/todo.router');
const app= express();

app.use(cors());
app.use(express.json());

app.use(todoRouter)



app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});