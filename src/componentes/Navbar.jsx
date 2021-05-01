import React from 'react'
import { NavLink } from 'react-router-dom'
import {auth} from './firebase'
import { withRouter } from 'react-router'

const Navbar = (props) => {
     // console.log(props);

     const cerrarSesion = () => {
          auth.signOut()
               .then (() => {
                    props.history.push('/login')
               })    
     }

     return (
          <div className="nav-wrapper">
               <ul id="nav-mobile" className="left">
                    <li>
                         <NavLink to="/" exact>
                              Formulario
                         </NavLink>
                    </li>

                    {
                         props.firebaseUser !== null ? 
                         (
                              <li>
                                   <NavLink to="/registros">
                                        Registros
                                   </NavLink>
                              </li>
                         ) : null
                    }

                    {
                         props.firebaseUser !== null ? (
                              <button 
                              className="waves-effect waves-light btn-small" 
                              onClick={ () => cerrarSesion() }
                              >Cerrar Sesión
                              </button>
                         ) : (
                         <li>
                              <NavLink to="/login">
                                   login
                              </NavLink>
                         </li>
                              )

                    }

               </ul>
          </div>
     )
}
export default withRouter ( Navbar )
