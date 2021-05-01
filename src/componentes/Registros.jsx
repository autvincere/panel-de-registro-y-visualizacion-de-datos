import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { auth, db } from './firebase'
import { withRouter } from 'react-router'

const Registros = (props) => {

     const [user, setUser] = useState(null)
     const [registros, setRegistros] = useState([])

     useEffect(() => {
          if (auth.currentUser) {
               console.log('existe un usuario');
               setUser(auth.currentUser)
          } else {
               console.log('No existe el usuario');
               props.history.push('/login')
          }
     }, [props.history])

     useEffect(() => {
          const obtenerDatos = async () => {
               try {
                    const data = await db.collection('registros').get()
                    // console.log(data.docs);
                    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                    console.log(arrayData);
                    setRegistros(arrayData)

               } catch (error) {
                    console.log(error);

               }
          }
          obtenerDatos()
     }, [])

     return (
          <div className='container'>
               <div className='row'>
                    <div className="col s12">
                         <h1>Registros</h1>
                         {
                              user && (<h3>{user.email}</h3>)
                         }
                         <table id="registros" className="striped centered">
                              <thead>
                                   <tr>
                                        <th>Nombre</th>
                                        <th>Apellido Pat.</th>
                                        <th>Apellido Mat.</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                        <th>Rut</th>
                                   </tr>
                              </thead>

                              <tbody>
                                   {registros.map(item => (
                                        <tr key={item.id}>
                                             <td>{item.nombre}</td>
                                             <td>{item.apellidoP}</td>
                                             <td>{item.apellidoM}</td>
                                             <td>{item.mail}</td>
                                             <td>{item.telefono}</td>
                                             <td>{item.rut}</td>
                                        </tr>
                                   ))

                                   }
                              </tbody>
                         </table>
                    </div>
               </div>
               <div className="row">
                    <div className="content-button-export">
                         <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="waves-effect waves-light btn"
                              table="registros"
                              filename="tablexls"
                              sheet="pagina 1"
                              buttonText="Exportar a Excel"
                         />

                         {/* <a className="waves-effect waves-light btn">
                    <i className="material-icons right">
                         cloud
                    </i>
                    button
               </a> */}
                    </div>
               </div>
          </div>

     )
}

export default withRouter(Registros)
