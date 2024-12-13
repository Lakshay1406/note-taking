import { useState } from "react"

const CreateNote = (props) => {
    const[title,updateTitle]=useState("");
    const[content,updateContent]=useState("");

    function onChange(event){
        const{name,value}=event.target;
        if(name==="title"){
            updateTitle(value);
        }
        else if(name==="content"){
            updateContent(value);
        }
    }
    
  return (
    <div className="flex justify-center ">
      <form onSubmit={(e) => e.preventDefault()}
        className="relative bg-zinc-700 flex flex-col gap-2 items-start mt-20 shadow-md  w-72 sm:w-96 p-5 rounded-lg"
      >
        <input className="outline-none bg-inherit w-full text-white font-sans font-semibold" 
        type="text" placeholder="Title" value={title} onChange={onChange} name="title"></input>
        <textarea className="outline-none w-full bg-inherit text-white" 
        rows="3" type="text" placeholder="Take a note..." value={content} onChange={onChange} name="content"></textarea>
        <button className="absolute top-full left-60 sm:left-80 bg-yellow-400 rounded-full p-2 shadow-md -mt-5"
        onClick={()=>{
            const newNote={title:title,content:content};
            if(title!=="" || content!==""){ 
            props.onAdd(newNote);
            updateTitle("");
            updateContent("");
            }
        }}>Add</button>
      
      </form>
      </div>
    
  )
}

export default CreateNote
