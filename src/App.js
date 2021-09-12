
import './App.css';
import Listar from "./componentes/Listar";

import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Crear from './componentes/Crear';
import Editar from './componentes/Editar';



function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>Inicio <span className="sr-only"></span></Link>
          <Link className="nav-item nav-link" to={"/crear"}>crear</Link>
          <Link className="nav-item nav-link" to={"/Editar"}>Editar</Link>
        </div>
      </nav>
      <div className="Container">



        <Route exact path="/" component={Listar}></Route>
        <Route path="/Crear" component={Crear}></Route>
        <Route path="/Editar/:id" component={Editar}></Route>

      </div>
    </Router>
  );
}

export default App;
