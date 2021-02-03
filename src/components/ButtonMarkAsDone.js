import React from 'react';
import {IoCheckmarkDone, IoClose} from "react-icons/io5";
import {API_ROUTES} from "../config/api";
import {toast} from "react-toastify";
import {confirmAlert} from "react-confirm-alert";
import "../assets/react-confirm-alert.css";

const ButtonMarkAsDone = ({todo, todos, setTodos}) => {
  const markAsDone = async (todo) => {
    const doneMsg = todo.done ? 'not done' : 'done';
    try {

      const res = await fetch(`${API_ROUTES.TODOS}/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({...todo, done: !todo.done})
      });

      const data = await res.json();

      setTodos(todos.map(td => td.id === todo.id ? data : td));

      toast.success(`Todo marked as ${doneMsg}`);

    } catch (e) {
      console.log(e)
    }
  }

  const confirmAction = (todo) => {
    const doneMsg = todo.done ? 'not done' : 'done';
    const yesClass = todo.done ? "small-button warning" : "small-button info";
    const options = {
      title: 'Confirm?',
      message: `Are you sure, You want to mark this todo as ${doneMsg}?`,
      buttons: [
        {
          label: `Yes, Set ${doneMsg}`,
          onClick: () => markAsDone(todo),
          className: yesClass
        },

        {
          label: 'Cancel',
          className: "small-button"
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    };

    confirmAlert(options);
  }

  return (
    <>
      <button className={`small-button ${todo.done ? 'warning' : 'info'}`} onClick={() => confirmAction(todo)} type="button">
        {todo.done ? <IoClose/> : <IoCheckmarkDone/>}
      </button>
    </>
  );
};

export default ButtonMarkAsDone;
