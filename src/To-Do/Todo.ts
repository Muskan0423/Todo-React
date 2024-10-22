import React, { useEffect, useState } from "react";
import "./todo.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("data");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(taskList));
    console.log(taskList);
    
  }, [taskList]);



  const handleClick = () => {
    if (task.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTaskList([...taskList, newTask]);
    setTask("");
  };

  const handleDelete = (id) => {
    setTaskList(taskList.filter(t => t.id !== id));
  };

  const checkCompleted = (id) => {
    setTaskList(taskList.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const editTask = (id, currentText,isCompleted) => {
    console.log(task,"taskkkkk");
    if(isCompleted)
    {
        alert("You are not able to edit this")
        return;
    }
   
    
    setEditingId(id);
    setTask(currentText); 
  };

  const handleEdit = () => {
       setTaskList(taskList.map(t => 
      t.id === editingId ? { ...t, text: task } : t
    ));
    setEditingId(null); 
    setTask(""); 
  };

  return (
    <div className="todo-container">
      <h1>To Do</h1>
      <input
        type="text"
        id="task-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button id="add-task-btn" onClick={editingId ? handleEdit : handleClick}>
        {editingId ? "Update Task" : "Add Task"}
      </button>
      <ul id="task-list">
        {taskList.map(t => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            {t.text} 
            <button className="delete-btn" onClick={() => handleDelete(t.id)}>
              Delete
            </button>
            <button id="CheckCompleted" onClick={() => checkCompleted(t.id)}>
              {t.completed ? "✔️" : ""}
            </button>
            <button id="Edit" onClick={() => editTask(t.id, t.text,t.completed)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
