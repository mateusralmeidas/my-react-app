import {useEffect,useState} from 'react'
import {db} from './firebaseConnection'
import {doc,
   setDoc, 
   collection,
    addDoc,
      getDoc, 
      getDocs, 
      updateDoc, 
      deleteDoc,
    onSnapshot} from 'firebase/firestore'
import './app.css'

function App() {

  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [posts,setPosts] = useState([]);
  const [idPost,setIdPost] = useState('');

  useEffect(()=>{
    async function loadPosts(){
      const unsub = onSnapshot(collection(db,"posts"),(snapshot)=>{
        let listPosts = [];

        snapshot.forEach((doc)=>{
          listPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        setPosts(listPosts);
      })
    }

    loadPosts();
  },[])


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
    // const postRef = doc(db,"posts","12345")

    // await getDoc(postRef)
    // .then((snapshot)=>{
    //   setAuthor(snapshot.data().autor)
    //   setTitle(snapshot.data().titulo)
    // })
    // .catch((error)=>{
    //   console.log("Gerou erro: " + error)
    // })

    const postRef = collection(db,"posts")
    await getDocs(postRef)
    .then((snapshot)=>{
      let list = [];

      snapshot.forEach((doc)=>{
        list.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(list);
    })
    .catch((error)=>{
      console.log("Gerou erro: " + error)
    })
  }

  async function editarPost(){

    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef,{
      titulo: title,
      autor: author
    })
    .then(()=>{
      setIdPost('');
      setTitle('');
      setAuthor('');
    })
    .catch((error)=>{
      console.log("Gerou erro: " + error)
    })
  }

  async function excluirPost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(()=>{
      alert("Excluido com sucesso!")
    })
    .catch((error)=>{
      console.log("Gerou erro: " + error)
    })
  }

  return (
    <div className="App">
      <h1>React + Firebase</h1>

      <div className="container">


        <label>Id do Post:</label>
        <input type="text" placeholder='Digite o Id do post' value={idPost} onChange={(e) => setIdPost(e.target.value)}/>
        <br/>
        <label>Titulo:</label>
        <textarea type="text" placeholder='Digite o título' value={title} onChange={(e) => setTitle(e.target.value)}/>

        <label>Autor:</label>
        <input type="text" placeholder='Digite o autor' value={author} onChange={(e) => setAuthor(e.target.value)}/>

        <button onClick={handleAdd}>Cadastrar</button>

        <button onClick={buscarPost}>Buscar post</button>

        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post)=>{
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong><br/>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/>
                <button onClick={()=> excluirPost(post.id)}>Excluir</button> <br/><br/>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
