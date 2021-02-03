import React from 'react';
import {IoTrash} from "react-icons/io5";
import {toast} from "react-toastify";
import {confirmAlert} from 'react-confirm-alert';
import "../assets/react-confirm-alert.css";
import Client from "../config/client";

const ButtonDelete = ({todo, todos, setTodos}) => {

  const deleteTodo = async (todo) => {
    try {
      const {status} = await Client().delete(`todos/${todo.id}`);
      setTodos(todos.filter(td => td.id !== todo.id));
      toast.success(`Todo deleted`);
    } catch (e) {
      console.log(e)
    }
  }

  const confirmAction = (todo) => {
    const options = {
      title: 'Delete?',
      message: 'Are you sure, You want to delete this todo?',
      buttons: [
        {
          label: 'Yes, Delete',
          onClick: () => deleteTodo(todo),
          className: "small-button danger"
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
    <button className="small-button danger" onClick={() => confirmAction(todo)} type="button">
      <IoTrash/>
    </button>
  );
};

export default ButtonDelete;
