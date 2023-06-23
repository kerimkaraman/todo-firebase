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
    const docID = uuid()
    await setDoc(doc(db, "todo", docID), {
      id: docID,
      text: todo,
    });
  }
  async function getTodos() {
    const querySnapshot = await getDocs(collection(db, "todo"));
    const todos = querySnapshot.docs.map(doc => doc.data())
    setAllTodos(todos)
  }

  const todoButtonClick = () => {
    uploadTodo();
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, [])

  const styles = {
    bgBlue: {
      'backgroundColor': '#0093E9',
      'backgroundImage': 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
    },
    bgRed: {
      'backgroundColor': '#FFE53B',
      'backgroundImage': 'linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)'
    },
    bgGreen: {
      'backgroundColor': '#F4D03F',
      'backgroundImage': 'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)'
    }
  }


  const [bgChoose, setBgChoose] = useState(styles.bgBlue);
  return (
    <div style={bgChoose} className="App">
      <div className="bg-buttons">
        <button style={styles.bgGreen}
          onClick={() => { setBgChoose(styles.bgGreen) }}
          className="setting-btn bg-greenish-button"></button>
        <button style={styles.bgBlue}
          onClick={() => { setBgChoose(styles.bgBlue) }}
          className="setting-btn bg-blueish-button"></button>
        <button style={styles.bgRed}
          onClick={() => { setBgChoose(styles.bgRed) }}
          className="setting-btn bg-redish-button"></button>
      </div>
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
        <input type="text" onChange={(e) => { setTodo(e.target.value) }} placeholder="Enter a To-do..." />
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
