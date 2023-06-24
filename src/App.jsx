import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import Typewriter from 'typewriter-effect';
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuid } from 'uuid';
import { collection, getDocs } from "firebase/firestore";

function App() {

  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  async function uploadTodo() {
    if (todo != " ") {
      const docID = uuid();
      await setDoc(doc(db, "todo", docID), {
        id: docID,
        text: todo,
      });
    }
  }
  async function getTodos() {
    const querySnapshot = await getDocs(collection(db, "todo"));
    const todos = querySnapshot.docs.map(doc => doc.data());
    setAllTodos(todos);
  }

  const todoButtonClick = () => {
    uploadTodo();
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className="App">
      <div className="todo-header">
        <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter.typeString('To-Do List')
              .pauseFor(2500)
              .deleteAll()
              .start();
          }}
        />
      </div>
      <div className="input-area">
        <input type="text" onChange={(e) => { setTodo(e.target.value) }} placeholder="Enter a To-do..." value={todo} />
        <button className="add-btn" onClick={todoButtonClick}>Add To-Do</button>
      </div>
      <div className="todo-items">
        {
          allTodos.map((todoItem) => {
            return (<TodoItem key={todoItem.id} id={todoItem.id} text={todoItem.text} />)
          })
        }
      </div>
    </div>
  )
}

export default App
