import {useState} from 'react';
import {API_ROUTES} from "../config/api";
import {useHistory} from "react-router-dom";
import {IoSaveOutline} from "react-icons/io5";
import {toast} from "react-toastify";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {useEffect} from "react";

const AddTodo = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Todo List - New Todo"
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [repeat, setRepeat] = useState('once');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;

    const validationErrors = {};

    if (title.length < 5) {
      validationErrors.title = "Title must have to be greater then 5 characters.";
      isValid = false;
    }

    if (date.length === 0) {
      validationErrors.date = "Date must be inputted.";
      isValid = false;
    }

    if (repeat.length === 0) {
      validationErrors.repeat = "Repeat must be selected.";
      isValid = false;
    }

    setErrors(validationErrors);

    return isValid;
  }

  const submitTodo = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return false;
    }

    try {

      const res = await fetch(API_ROUTES.TODOS, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({title, description, date, repeat, done: false})
      });

      await emptyForm();
      await history.push('/');
      toast.success(`New todo saved.`);
      return await res.json();
    } catch (e) {
      console.log(e)
    }

  }

  const setDateFromPicker = (date) => {
    console.log(date);
    setDate(date);

  }

  const emptyForm = async () => {
    await setTitle('');
    await setDescription('');
    await setDate('');
    await setRepeat('once');
  }

  return (
    <form className="App-form" onSubmit={submitTodo}>
      <div className="form-item">
        <label htmlFor="title">Title</label>
        <input className="form-input" type="text" placeholder="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <span className="error-msg">{errors.title}</span>
      </div>

      <div className="form-item">
        <label htmlFor="description">Description</label>
        <textarea className="form-input" placeholder="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <span className="error-msg">{errors.description}</span>
      </div>

      <div className="form-item">
        <label htmlFor="date">Date</label>
        {/*<input className="form-input" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>*/}
        <Datetime
          value={date}
          inputProps={{className: 'form-input'}}
          onChange={setDateFromPicker}
        />
        <span className="error-msg">{errors.date}</span>
      </div>

      <div className="form-item">
        <label htmlFor="repeat">Repeat</label>
        <select className="form-select" id="repeat" value={repeat} onChange={(e) => setRepeat(e.target.value)}>
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <span className="error-msg">{errors.repeat}</span>
      </div>

      <button className="button submit-button" type="submit"><IoSaveOutline/> Save</button>
    </form>
  );
};

export default AddTodo;
