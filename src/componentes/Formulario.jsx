import React, { useState } from 'react'
import { validate, format } from 'rut.js';
import { db } from './firebase';
import ReCAPTCHA from "react-google-recaptcha";

const Formulario = () => {
     // Crear Stat de citas
     const [datos, setDatos] = useState({
          nombre: '',
          apellidoP: '',
          apellidoM: '',
          mail: '',
          telefono: '',
          rut: '',
          mensaje: ''
     })

     const [captcha, setCaptcha] = useState(false)
     const [errorGeneral, setErrorGeneral] = useState('')
     const [errorRut, setErrorRut] = useState('')
     const [errorMail, setErrorMail] = useState('')
     const [errorPhone, setErrorPhone] = useState('')
     const [success, setSuccess] = useState('')

     const TEST_SITE_KEY = '6LdwaccZAAAAAN6GhngnL5WdBjdaEx3ZKdSoBW8a';

     const onChange = (value) => {
          setCaptcha(true)
          console.log("Captcha value:", value);
     }

     const actualizarState = e => {
          // console.log(e.target.name);
          setDatos({
               ...datos,
               [e.target.name]: e.target.value
          })
     }

     // extraer los valores
     let { nombre, apellidoP, apellidoM, mail, rut, telefono, mensaje } = datos;

     //doy formato correcto a rut
     datos.rut = format(rut)
     // datos.telefono = '+569' + telefono;

     // useEffect(() => {
     //      const pruebaDatos = async () => {
     //           try {
     //                const data = await db.collection('registros').get()
     //                // const query = data.where("mail", "==", true)
     //                // console.log(query);
     //                const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
     //                // console.log(arrayData);
     //                const output =  arrayData.filter(data => data.rut === datos.rut);
     //                console.log(output.length);

     //           } catch (error) {
     //                console.log(error);

     //           }
     //      }
     //      pruebaDatos()
     // }, [datos.rut])


     //Agregar datos
     const submitCita = async (e) => {
          e.preventDefault();
          //console.log(nombre);
          //doy formato correcto a rut
          datos.rut = format(rut)
          // datos.telefono = '+569' + telefono;
          //Validar
          //|| !rut.trim()

          if (!nombre.trim() || !apellidoP.trim() || !apellidoM.trim() || !mail.trim() || !telefono.trim() || !mensaje.trim()) {
               console.log('Ingrese todos los campos porfavor');
               setErrorGeneral('Ingrese todos los campos porfavor')
               return
          }

          if (validate(rut) === false) {
               console.log('rut invalido');
               setErrorRut('Rut inválido')
               return
          } else {
               // format(rut)
               setErrorRut(null)
          }


          if (!/^[0-9]{8}$/.test(telefono)) {
               // console.log('telefono invalido')
               setErrorPhone('Número de celular inválido')
               return
          } else {
               console.log('telefono Valido')
               datos.telefono = '+569' + telefono; 
               setErrorPhone(null)
          }

          if (!/\S+@\S+\.\S+/.test(mail)) {
               console.log('mail invalido')
               setErrorMail('mail invalido')
               return
          } else {
               setErrorMail(null)
          }
          // cita.rut = format(rut)

          //Agregar registros a la base de datos

          try {
               const data = await db.collection('registros').get()
               const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
               const output = arrayData.filter(data => data.rut === datos.rut);
               console.log(output);
               // console.log(rut);

               // console.log(data.docs);
               const nuevoRegistro = {
                    ...datos,
                    fecha: Date.now()
               }
               if (output.length >= 1) {
                    console.log('usuario existente')
                    setErrorRut('Usuario existente')
                    return
               } else {
                    await db.collection('registros').add(nuevoRegistro)
               }

               //obtener rut base de datos



               // const coincidencias = rutsBaseDatos.docs.filter(rutBaseDatos => rutBaseDatos.rut === datos.rut)
               // console.log(coincidencias);

               // await db.collection('registros').add(nuevoRegistro)

          } catch (error) {
               console.log(error);

          }



          setErrorGeneral(false)
          console.log('Todos los campos son validos');
          setSuccess('Todos los campos han sido llenados exitosamente. Pronto nos pondremos en contacto contigo.')
          //Asignar un ID
          // datos.id = uuidv4();

          // Crear la cita por medio de props
          // crearRegistro(datos)

          // Reiniciar el form
          setDatos({
               nombre: '',
               apellidoP: '',
               apellidoM: '',
               mail: '',
               telefono: '',
               rut: '',
               mensaje: ''
          })

     }
     return (
          <div className='container'>
               <div className='row margin-top-50 z-depth-1'>
                    <h3 className="center-align title-form">Formulario</h3>

                    {errorGeneral && <div className='card-panel red lighten-1 error-content center'>{errorGeneral}</div>}

                    <form onSubmit={submitCita}>

                         <div className="input-field col s12">
                              <input
                                   onChange={actualizarState}
                                   type="text"
                                   name="nombre"
                                   className="u-full-width"
                                   value={nombre}
                              />
                              <label>Nombre</label>
                         </div>

                         <div className="input-field col s12">
                              <input
                                   onChange={actualizarState}
                                   type="text"
                                   name="apellidoP"
                                   className="u-full-width"
                                   value={apellidoP}
                              />
                              <label>Apellido Materno</label>
                         </div>

                         <div className="input-field col s12">
                              <input
                                   onChange={actualizarState}
                                   type="text"
                                   name="apellidoM"
                                   className="u-full-width"
                                   value={apellidoM}
                              />
                              <label>Apellido Paterno</label>
                         </div>

                         <div className="input-field col s3 m2">
                              <input

                                   type="tel"
                                   name="tel"
                                   className="u-full-width"
                                   value="+569"
                              />
                         </div>
                         <div className="input-field col s9 m10">

                              <input
                                   onChange={actualizarState}
                                   type="tel"
                                   name="telefono"
                                   className="u-full-width"
                                   value={telefono}
                              />
                              <label>Celular</label>
                              {errorPhone && <p className='red-text'>*{errorPhone}</p>}


                         </div>

                         <div className="input-field col s12">
                              <input
                                   onChange={actualizarState}
                                   type="text"
                                   name="mail"
                                   className="u-full-width"
                                   value={mail}
                              />
                              <label>Email</label>
                              {errorMail && <p className='red-text'>*Por favor ingrese un mail valido</p>}

                         </div>

                         <div className="input-field col s12">

                              <input
                                   onChange={actualizarState}
                                   // onChange={actualizarState}
                                   type="text"
                                   name="rut"
                                   className="u-full-width"
                                   value={rut}
                              />
                              <label>Rut</label>
                              {errorRut && <p className='red-text'>*{errorRut}</p>}
                         </div>

                         <div className="input-field col s12">
                              <textarea
                                   onChange={actualizarState}
                                   name="mensaje"
                                   className="u-full-width materialize-textarea"
                                   value={mensaje}
                              ></textarea>
                              <label>Mensaje</label>
                         </div>
                         <div className="col s12 content-center">
                              <ReCAPTCHA
                                   className="center-align"
                                   sitekey={TEST_SITE_KEY}
                                   onChange={onChange}
                              />
                         </div>
                         <div className="input-field col s12 center-align">
                              {
                                   captcha ? (<button className="btn waves-effect waves-light" type="submit" name="submit">enviar<i className="material-icons right">send</i></button>) : (<button className="btn disabled">enviar<i className="material-icons right">send</i></button>)
                              }
                         </div>

                         {success && <div className="col s12 content-center"><div className='card-panel teal lighten-2 error-content center'>{success}</div></div>}

                    </form>
               </div>
          </div>
     )
}

export default Formulario
