import { useState,useEffect } from "react"
import Note from "./Note";
import CreateNote from "./CreateNote";
import { useNavigate } from "react-router-dom";
import MyModal from "./MyModel";
const NoteApp = () => {
  const navigate = useNavigate();
  const [notes,updateNotes]=useState([]);
  const [user, setUser] = useState(null);
  const [showModel,setShowModel]=useState(false);
  const [currNote,setCurrNote]=useState();
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
      else{
        return navigate('/login');
      }
  },[navigate])

  useEffect(()=>{
    console.log(user);
    if(user===null) return;
    const fetchNotes = async () => {
    try {
      const id=user.userId;
      const response=await fetch(`${import.meta.env.VITE_APP_BACKEND_URI}/note?id=${id}`,{
        method:'GET',
        headers:{'Content-type':"application/json"},
      });
      const result = await response.json();
      console.log(result);
      updateNotes(result.notes);
      
    
    }catch(error){
      console.log(error);
    }
  }
  fetchNotes();
},[user]);


  function newNote(note){ 
    updateNotes((prevValue)=>{
      return [...prevValue,note]
    })

      const writeData=async()=>{
        try{
        const response=await fetch(`${import.meta.env.VITE_APP_BACKEND_URI}/note/add`,{
          method:'POST',
          headers:{'Content-type':"application/json"},
          body:JSON.stringify({"note":note,"email":user.email})
        });
        const  result=await response.json();
        console.log(result);
      }catch(error){
        console.log(error);
      }
      }
      writeData();
      
    

  }

  function deleteNote(id){

    updateNotes((prevValue)=>{
      return prevValue.filter((note)=>{
        return note._id!=id
      })
    })
    const delData=async()=>{
      try{
      
      const response=await fetch(`${import.meta.env.VITE_APP_BACKEND_URI}/note/delete`,{
        method:'POST',
        headers:{'Content-type':"application/json"},
        body:JSON.stringify({"noteId":id,"email":user.email})
      });
      const  result=await response.json();
      console.log(result);
    }catch(error){
      console.log(error);
    }
    }
    delData();

  }

   function updateNote(title,content){
      updateNotes((prevValue)=>{
        return prevValue.map((note)=>{
          return note._id===currNote._id 
          ?{...note, title:title,content:content}:note
        })
      })


    const updNote=async()=>{
      try{
      const response=await fetch(`${import.meta.env.VITE_APP_BACKEND_URI}/note/update`,{
        method:'POST',
        headers:{'Content-type':"application/json"},
        body:JSON.stringify(
          {"noteId":currNote._id,
            "email":user.email,
            "note":{
              "title":title,
              "content":content
            }
          })
      });
      const  result=await response.json();
      console.log(result);
    }catch(error){
      console.log(error);
    }
    }
    updNote();
   }

  function logout(){
    localStorage.removeItem("user");
    setUser(null);
    navigate('/');
  }

  function handleOnClose(){
    setShowModel(false);
  }

  function openModel(id){
    
    const note=notes.find(note=>note._id===id);
    console.log("note",note);
    setCurrNote(note);
    setShowModel(true);
    console.log(currNote)
  }

  return (
    <div className="bg-zinc-800 overflow-auto h-screen pb-10 scrollbar-dark">
      <div className="bg-yellow-500 text-white p-5 flex font-mono text-2xl shadow-xl" >
        <h1>Take Notes</h1>
        <button onClick={logout} className="bg-zinc-800 text-sm text-yellow-500 ml-auto rounded-md p-1 px-2 hover:text-white">Logout</button>
      </div>  


      <CreateNote onAdd={newNote} />
      <MyModal onClose={handleOnClose} visible={showModel} currNote={currNote} updateNote={updateNote}/>
      
      {/* <div className="flex justify-start flex-wrap mt-16 mx-8 gap-3"> */}
      <div className="mx-8">
      <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 overflow-auto mt-16 ">
      {notes.map((note)=>{
        return <Note 
            key={note._id} 
            id={note._id} 
            title={note.title} 
            content={note.content} 
            deleteNote={deleteNote}
            updateNote={updateNote}
            openModel={openModel}
            /> 
      })}
      </div>  
      </div>     
    </div>
  )
}

export default NoteApp
