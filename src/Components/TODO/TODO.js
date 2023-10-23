import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateTask from "../CreateTask/CreateTask";
import "./TODO.css";
import Task from "./../Task/Task";

export default function TODO() {
  const [tasks, setTasks] = useState([
    {
      title: "Go to gym",
      completed: true,
    },
    {
      title: "Do your workout",
      completed: true,
    },
    {
      title: "Hangout with friends",
      completed: false,
    },
  ]);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed; // toggle state
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="TODO">
      <div className="todo-container">
        <h2>My To-do list</h2>
        <div className="create-task">
          <CreateTask addTask={addTask} />
        </div>
        <Tabs defaultActiveKey="all" className="mb-3">
          <Tab eventKey="all" title="ALL">
            <div className="tasks">
              {tasks.map((task, index) => (
                <Task
                  task={task}
                  index={index}
                  completeTask={completeTask}
                  removeTask={removeTask}
                  key={index}
                />
              ))}
            </div>
          </Tab>
          <Tab eventKey="pending" title="Pending">
            <div className="tasks">
              {tasks
                .filter(function (task) {
                  return task.completed == false;
                })
                .map((task, index) => (
                  <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                  />
                ))}
            </div>
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <div className="tasks">
              {tasks
                .filter(function (task) {
                  return task.completed == true;
                })
                .map((task, index) => (
                  <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                  />
                ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
