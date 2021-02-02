import {Link, useLocation} from "react-router-dom";
import {IoAdd, IoList} from "react-icons/io5"

const Header = () => {
  const location = useLocation();

  return (
    <header className="App-header">
      <h4>Todo List</h4>
      {
        location.pathname === '/' ?
          (<Link className="button header-button" to="/todos/add"><IoAdd/> New Todo</Link>) :
          (<Link className="button header-button" to="/"><IoList/> Todos</Link>)
      }
    </header>
  );
};

export default Header;
