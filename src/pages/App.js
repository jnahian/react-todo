import {BrowserRouter as Router, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import '../assets/App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header/>
        <section className="App-content">
          <Route path="/" exact component={TodoList}/>
          <Route path="/todos/add" exact component={AddTodo}/>
        </section>
        <Footer/>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
