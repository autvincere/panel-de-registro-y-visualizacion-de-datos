import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
     apiKey: "AIzaSyCRas4MJcR965EVvG3prwXue-TFevOUkKE",
     authDomain: "admin-registros-formulario.firebaseapp.com",
     databaseURL: "https://admin-registros-formulario.firebaseio.com",
     projectId: "admin-registros-formulario",
     storageBucket: "admin-registros-formulario.appspot.com",
     messagingSenderId: "593586462739",
     appId: "1:593586462739:web:dd5b8525eb5842d92a9fe6"
   };

   // Initialize Firebase
   app.initializeApp(firebaseConfig);
   const db = app.firestore()
   const auth = app.auth()
  
   export {db, auth}