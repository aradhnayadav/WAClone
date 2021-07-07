// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyB1SygTZH3vXPZvKQeMQHva7RzwQl1R6h8",
    authDomain: "whatsapp-clone-e1859.firebaseapp.com",
    projectId: "whatsapp-clone-e1859",
    storageBucket: "whatsapp-clone-e1859.appspot.com",
    messagingSenderId: "397774009630",
    appId: "1:397774009630:web:198bc1c5d2b90c2a64050f",
    measurementId: "G-WX9BQ5L679"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth=firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;