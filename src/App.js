import {useEffect,useState} from 'react'
import {db} from './firebaseConnection'
import {doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore'
import './app.css'

function App() {

  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');


  async function handleAdd(){
    // await setDoc(doc(db, "posts","12345"),{
    //   titulo: title,
    //   autor: author
    // })
    // .then(()=>{
    //   console.log("Dados salvos no banco")
    // })
    // .catch((error)=>{
    //   console.log("Gerou erro: " + error)
    // })

    await addDoc(collection(db,"posts"),{
      titulo: title,
      autor: author
    })
    .then(()=>{
      console.log("Dados salvos no banco")
      setTitle('');
      setAuthor('');
    })
    .catch((error)=>{
      console.log("Gerou erro: " + error)
    })

  }


  async function buscarPost(){
    const postRef = doc(db,"posts","12345")

    await getDoc(postRef)
    .then((snapshot)=>{
      setAuthor(snapshot.data().autor)
      setTitle(snapshot.data().titulo)
    })
    .catch((error)=>{
      console.log("Gerou erro: " + error)
    })
  }

  return (
    <div className="App">
      <h1>React + Firebase</h1>

      <div className="container">
        <label>Titulo:</label>
        <textarea type="text" placeholder='Digite o título' value={title} onChange={(e) => setTitle(e.target.value)}/>

        <label>Autor:</label>
        <input type="text" placeholder='Digite o autor' value={author} onChange={(e) => setAuthor(e.target.value)}/>

        <button onClick={handleAdd}>Cadastrar</button>

        <button onClick={buscarPost}>Buscar post</button>
      </div>
    </div>
  );
}

export default App;
