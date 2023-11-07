import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateTask from "../CreateTask/CreateTask";
import "./TODO.css";
import {
  collection,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext.tsx";
import Task from "./../Task/Task";

export default function TODO() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;
    const db = getFirestore();
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "tasks"),
      (snapshot) => {
        const newTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(newTasks);
      }
    );
    return () => unsubscribe();
  }, [user]);

  const addTask = async (title) => {
    if (!user) return;
    const db = getFirestore();
    await addDoc(collection(db, "users", user.uid, "tasks"), {
      title,
      completed: false,
      lastUpdate: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
  };

  const completeTask = async (task) => {
    if (!user) return;
    const db = getFirestore();
    await updateDoc(doc(db, "users", user.uid, "tasks", task.id), {
      completed: !task.completed,
      lastUpdate: serverTimestamp(),
    });
  };

  const removeTask = async (task) => {
    if (!user) return;
    const db = getFirestore();
    await deleteDoc(doc(db, "users", user.uid, "tasks", task.id));
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
              {tasks.map((task) => (
                <Task
                  task={task}
                  completeTask={completeTask}
                  removeTask={removeTask}
                  key={task.id}
                />
              ))}
            </div>
          </Tab>
          <Tab eventKey="pending" title="Pending">
            <div className="tasks">
              {tasks
                .filter(function (task) {
                  return !task.completed;
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
                  return !!task.completed;
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
