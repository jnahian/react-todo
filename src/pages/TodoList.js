import {useEffect, useState} from "react";
import moment from 'moment';
import ButtonMarkAsDone from "../components/ButtonMarkAsDone";
import ButtonDelete from "../components/ButtonDelete";
import Client from "../config/client";

const TodoList = () => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    document.title = "Todo List - All";
  }, []);

  useEffect(() => {
    const getTodos = async () => {
      const tasks = await fetchTodos();
      setTodos(tasks);
    }

    getTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const {data} = await Client().get('/todos');
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  const formatDateTime = (date) => {
    let newDate = new Date(date);
    return moment(newDate).format('lll');
  }

  return (
    <div className="App-todos">
      {todos.length === 0 && <div className="App-todo">There is no todo.</div>}
      {todos.map(todo =>
        (<div className={`App-todo ${todo.done ? 'done' : ''}`} key={todo.id}>
          <div>
            <h3>{todo.title} <span className="tag">{todo.repeat}</span></h3>
            <p>{todo.description}</p>
            <p className="date">Date: {formatDateTime(todo.date)}</p>
          </div>
          <div className="actions">
            <ButtonMarkAsDone todo={todo} todos={todos} setTodos={setTodos}/>
            <ButtonDelete todo={todo} todos={todos} setTodos={setTodos}/>
          </div>
        </div>)
      )}
    </div>
  );
};

export default TodoList;
