const Task = require("../models/taskModel");
const { client } = require("../db");

// CREATE - Agregar una nueva tarea
const createTask = async (req, res) => {
    try {
      const { name, description } = req.body;
      var newTask = new Task({
        name,
        description,
      });
      const savedTask = await new Task.save(newTask);
    } catch (error) {
      console.error("Error creating Task:", error);
      res.status(400).json({ error: "Error creating Task" });
    }
  };
  
// READ -lista de todas las tareas
async function getTasks(req, res) {
  try {
    await client.connect();
    const db = client.db("exercise-crud");
    const collection = db.collection("tasks");

    const tasks = await collection.find().toArray();

    client.close();

    res.send(tasks);
  } catch (error) {
    res.status(500).send("Error fetching tasks: " + error.message);
  }
}

// UPDATE - Actualizar una tarea  ID
async function updateTask(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    await client.connect();
    const db = client.db("exercise-crud");
    const collection = db.collection("tasks");

    const updateTask = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );


    if (updateTask.modifiedCount > 0) {
      res.status(200).send("Task updated successfully");
    } else {
      res.status(400).send("Task not found or an error occurred during update");
    }
  } catch (error) {
    res.status(500).send("Error updating task: " + error.message);
  }
}

// DELETE - Eliminar una tarea ID
const deleteTask = async (req, res) => {
    try {
      const id = req.params.id;
      const taskDeleted = await Task.findByIdAndDelete({
        _id: id,
      });
      console.log("Succesfully task delete");
      res.status(200).json({
        Message: "Succesfully task delete",
        Deleted_task: taskDeleted,
      });
    } catch (error) {
      console.error("error deleting task", error);
      res.status(500).json({
        error: "error deleting task",
      });
    }
};
module.exports = {createTask, getTask, putTask, deleteTask 

};
 
