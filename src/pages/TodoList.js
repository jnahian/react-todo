import {useState, useEffect} from "react";
import {IoTrash, IoCheckmarkDone, IoClose} from "react-icons/io5";
import {toast} from "react-toastify";
import {API_ROUTES} from "../config/api";
import moment from 'moment';

const TodoList = () => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    document.title = "Todo List - All"
  }, []);

  useEffect(() => {
    const getTodos = async () => {
      const tasks = await fetchTodos();
      setTodos(tasks);
    }

    getTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(API_ROUTES.TODOS);
    return await res.json();
  }

  const markAsDone = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    const doneMsg = todo.done ? 'not done' : 'done';
    const isConfirmed = window.confirm(`Are you sure, You want to mark as ${doneMsg}?`);

    if (isConfirmed) {

      try {

        const res = await fetch(`${API_ROUTES.TODOS}/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({...todo, done: !todo.done})
        });

        const data = await res.json();

        setTodos(todos.map(td => td.id === id ? data : td));

        toast.success(`Todo marked as ${doneMsg}`);

      } catch (e) {
        console.log(e)
      }
    }
  }

  const deleteTodo = async (id) => {
    const isConfirmed = window.confirm(`Are you sure, You want to delete this todo.?`);

    if (isConfirmed) {

      try {

        await fetch(`${API_ROUTES.TODOS}/${id}`, {
          method: "DELETE"
        });

        setTodos(todos.filter(td => td.id !== id));

        toast.success(`Todo deleted`);

      } catch (e) {
        console.log(e)
      }
    }
  }

  const formatDateTime = (date) => {
    let newDate = new Date(date);
    return moment(newDate).format('lll');
  }

  return (
    <div className="App-todos">
      {todos.map(todo =>
        (<div className={`App-todo ${todo.done ? 'done' : ''}`} key={todo.id}>
          <div>
            <h3>{todo.title} <span className="tag">{todo.repeat}</span></h3>
            <p>{todo.description}</p>
            <p className="date">Date: {formatDateTime(todo.date)}</p>
          </div>
          <div className="actions">
            <button className={`small-button ${todo.done ? 'warning' : 'info'}`} onClick={() => markAsDone(todo.id)} type="button">
              {todo.done ? <IoClose/> : <IoCheckmarkDone/>}
            </button>
            <button className="small-button danger" onClick={() => deleteTodo(todo.id)} type="button">
              <IoTrash/>
            </button>
          </div>
        </div>)
      )}
    </div>
  );
};

export default TodoList;
