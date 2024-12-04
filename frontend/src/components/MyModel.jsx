import { useState,useEffect } from "react"

export default function MyModal(props) {
  if(props.visible===false) return null;
  function handleClose(e){
    if(e.target.id==="modelContainer"){
      
      props.onClose();
    }
  }

  
  const[title,updateTitle]=useState(props.currNote.title);
  const[content,updateContent]=useState(props.currNote.content);

  useEffect(()=>{
    updateTitle(props.currNote.title);
    updateContent(props.currNote.content);
  },[props.currNote])

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
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    id="modelContainer"
    onClick={handleClose}
    >
      <form onSubmit={(e) => e.preventDefault()}
        className="bg-zinc-600 flex flex-col gap-2 items-start mt-20 shadow-md w-72 sm:w-96 p-5 rounded-lg"
      >
        
        <textarea className="outline-none w-full bg-inherit text-yellow-400 resize-none scrollbar-dark   font-sans font-semibold" 
        type="text" rows={title.length<26?"1":"2"} placeholder="Title" value={title} onChange={onChange} name="title"></textarea>

        
        <div className="border w-full border-b border-yellow-400/75 "></div>

        <textarea className="outline-none w-full bg-inherit text-white scrollbar-dark" 
         rows={content.length<40?"2":"4"} type="text" placeholder="Take a note..." value={content} onChange={onChange} name="content"></textarea>

        <div className="ml-auto flex-col items-end justify-center">
         <button className="border border-yellow-400 rounded-md p-1 text-yellow-400"
         onClick={()=>{
          props.onClose();
        }}
         >close</button>

        <button className=" bg-yellow-400 rounded-md ml-2 p-1 shadow-md"
        onClick={()=>{
          props.updateNote(title,content);
          props.onClose();
        }}
        >update</button>
        </div>
      
      </form>
    </div>
  );
}