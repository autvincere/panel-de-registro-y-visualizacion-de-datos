import React, {useState, useEffect} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Formulario from './componentes/Formulario';
import Login from './componentes/Login';
import Registros from './componentes/Registros';
import Navbar from './componentes/Navbar';
import {auth} from './componentes/firebase'

function App() {

  const [ firebaseUser, setFirebaseUser ] = useState(false)

useEffect ( () => {
  auth.onAuthStateChanged(user =>{
    // console.log(user);
    user ? setFirebaseUser(user) : setFirebaseUser(null)
  })
},[])


  return firebaseUser !== false ? (
    <Router>
      
        <nav>
             <Navbar firebaseUser={firebaseUser}/>
        </nav>
      

      <div className="container">
      <Switch>

        <Route path="/" exact>
          <Formulario />
        </Route>

        <Route path="/login"> 
          <Login />
        </Route>

        <Route path="/registros">
         <Registros />
        </Route>

      </Switch>
      </div>
    </Router>

    
  ): (
    <p>Cargando...</p>
  )
}

export default App;
