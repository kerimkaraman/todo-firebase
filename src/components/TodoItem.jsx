import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function TodoItem(props) {
  const [textDec, setTextDec] = useState(false);
  const [editArea, setEditArea] = useState(false);
  const [editInput, setEditInput] = useState("");

  const updateTodo = async () => {
    const washingtonRef = doc(db, "todo", props.id);
    await updateDoc(washingtonRef, {
      text: editInput
    })
  }

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "todo", props.id));
  }

  return (
    <div className="todo-item">
      <div style={{ textDecoration: `${textDec ? "line-through" : "none"}` }} className="todo-item-content">
        <p onClick={() => { setTextDec(!textDec); setBgBlur(!bgBlur) }} className="todo-text">{props.text}</p>
        <div className="todo-item-edit-btns">
          <button onClick={() => { setEditArea(!editArea) }} className="todo-edit-btn">
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={deleteTodo} className="todo-delete-btn">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <div style={{ display: `${editArea ? 'flex' : 'none'}` }} className="todo-item-edit-area">
        <input type="text" onChange={(e) => { setEditInput(e.target.value) }} />
        <button onClick={updateTodo}>Save</button>
      </div>
    </div>
  );
}

export default TodoItem;
