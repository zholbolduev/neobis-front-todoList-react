import "./App.css";
import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [category, setCategory] = useState("Personal");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      setTasks([
        ...tasks,
        { text: taskInput, category: category, completed: false },
      ]);
      setTaskInput("");
    }
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const handleEdit = (index, newText) => {
    setEditIndex(index);
    setEditText(newText);
  };

  const handleEditSubmit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
  };

  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <h1>What's up,</h1>
        <input className="name" type="text" placeholder="Name here" />
      </div>

      <div id="todo-form" onSubmit={handleSubmit}>
        <h3>CREATE A TODO</h3>
        <span>What's on your todo list?</span>
        <br />
        <input
          className="addInput"
          type="text"
          id="taskInput"
          placeholder="Add a new task"
          value={taskInput}
          onChange={handleChange}
        />
      </div>

      <div id="categories">
        <span>Pick a category</span> <br />
        <div className="choose">
          <input
            className="circleBlue"
            type="radio"
            name="category"
            value="Business"
            id="ordinaryRadio"
            onChange={handleCategoryChange}
            checked={category === "Business"}
          />
          <label className="blue" htmlFor="ordinaryRadio">
            Business
          </label>
          <input
            className="circleRed"
            type="radio"
            name="category"
            value="Personal"
            id="importantRadio"
            onChange={handleCategoryChange}
            checked={category === "Personal"}
          />
          <label className="red" htmlFor="importantRadio">
            Personal
          </label>
        </div>
        <br />
        <button className="btn" onClick={handleSubmit}>
          Add Todo
        </button>
      </div>

      <h3>Todo list</h3>
      <ul id="taskList">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <div className="itemTask">
              {editIndex === index ? (
                <>
                  <input
                    style={{
                      width: "450px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#f4f4f4",
                      fontSize: "18px",
                    }}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    style={{ margin: "0px 7px 0 7px" }}
                    className="editbtn"
                    onClick={() => handleEditSubmit(index)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span style={{ width: "450px" }}>
                    <div
                      className={
                        task.category === "Business"
                          ? "circleBlue"
                          : "circleRed"
                      }
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "5px",
                        backgroundColor:
                          task.category === "Business" ? "blue" : "red",
                      }}
                    ></div>
                    {task.text}
                  </span>

                  <button
                    className="completebtn"
                    onClick={() => handleComplete(index)}
                  >
                    Complete
                  </button>
                  <button
                    style={{ margin: "0px 7px 0 7px" }}
                    className="editbtn"
                    onClick={() => handleEdit(index, task.text)}
                  >
                    Edit
                  </button>
                </>
              )}
              <button className="deletebtn" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
