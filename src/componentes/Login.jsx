import React, { useEffect, useState, useCallback } from 'react'
import { auth } from './firebase'

// para ocupar los props. history y linkear a la ruta oculta ocupamos withRouter
import {  withRouter } from 'react-router-dom'
// import M from 'materialize-css'
const Login = (props) => {
     const [datos, setDatos] = useState({
          email: 'prueba@prueba.com',
          pass: '123456'
     })

     const [errorGeneral, setErrorGeneral] = useState(null)
     const [errorMail, setErrorMail] = useState(null)

     const actualizarState = e => {
          // console.log(e.target.name);
          setDatos({
               ...datos,
               [e.target.name]: e.target.value
          })
     }
     let { email, pass } = datos;

     useEffect(() => {
          const M = window.M;
          document.addEventListener('DOMContentLoaded', function () {
               // const elems = document.querySelectorAll('.autocomplete');
               // const instances = M.Autocomplete.init(elems, {});
               M.updateTextFields();
          });
     }, [])

     const submitLogin = (e) => {
          e.preventDefault();
          console.log(email);

          //Validar
          if (!email.trim() || !pass.trim()) {
               console.log('ingresa campo');
               setErrorGeneral('Ingresa todos los datos')
               return
          }
          if (!/\S+@\S+\.\S+/.test(email)) {
               console.log('mail invalido');
               setErrorMail('email invalido')
               return
          } else {
               setErrorMail(null)
          }

          setErrorGeneral(false)
          console.log('Todos los campos son validos');

          setDatos({
               email: '',
               pass: ''
          })
          login()

     }
     
     const login = useCallback(async () => {
          try {
               const res = await auth.signInWithEmailAndPassword(email, pass)
               console.log(res.user);
               props.history.push('/registros')

          } catch (error) {
               console.log(error);
               if (error.code === 'auth/invalid-email') {
                    setErrorGeneral('Email no válido')
                    
               }
               if (error.code === 'auth/wrong-password') {
                    setErrorGeneral('Constraseña Equivocada')
                    
               }
               
          }
     }, [email, pass,props.history])

     return (
          <div className='container'>
               <div className='row margin-top-50 z-depth-1'>

                    <h5 className="col s12 center-align">Acceso de usuarios</h5>

                    <form onSubmit={submitLogin}>
                         <div className="input-field col s12">
                              <i className="material-icons prefix">account_circle</i>
                              <input
                                   name="email"
                                   type="text"
                                   className="validate"
                                   value={email}
                                   onChange={actualizarState}
                              />
                              {/* <label for="first_name">Ingrese un email</label> */}
                              {errorMail && <p className='alerta-error'>{errorMail}</p>}
                         </div>

                         <div className="input-field col s12">
                              <i className="material-icons prefix">lock</i>
                              <input
                                   name="pass"
                                   type="password"
                                   className="validate"
                                   value={pass}
                                   onChange={actualizarState}
                              />
                              {/* <label for="first_name">Ingrese una contraseña</label> */}
                         </div>
                         {errorGeneral && <h6 className="amber accent-1 col s12 center-align">{errorGeneral}</h6>}

                         <div className="input-field col s12 center-align">
                              <button className="btn waves-effect waves-light" type="submit" name="submit">Ingresar
                         <i className="material-icons right">send</i>
                              </button>
                         </div>

                    </form>

               </div>
          </div>
     )
}

export default withRouter(Login)
