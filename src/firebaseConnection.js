import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDXHNuj04c-S5vOBiHgDDh9BfK7g6iz24U",
    authDomain: "my-react-app-b240d.firebaseapp.com",
    projectId: "my-react-app-b240d",
    storageBucket: "my-react-app-b240d.appspot.com",
    messagingSenderId: "504747291707",
    appId: "1:504747291707:web:902312550d7023464e181e",
    measurementId: "G-VEDCVN66CK"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  export{db};