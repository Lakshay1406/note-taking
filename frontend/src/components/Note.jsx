
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Note(props) { 
  return (
    <div className="shadow-md sm:h-36 bg-zinc-700 rounded-md p-3 ">
      <div className="flex justify-start items-center pb-2">

      <div className="w-3/4">
      <h1 className="font-semibold text-yellow-400 truncate " >{props.title}</h1>
      </div>
      <div  className="text-yellow-400  ml-auto cursor-pointer  hover:text-yellow-500 "
      onClick={(e)=>{
        e.preventDefault();
        props.openModel(props.id);}}>
      <MdModeEdit />
      </div>
      <MdDeleteForever className="text-red-400 ml-1 hover:scale-150 hover:text-red-400 cursor-pointer" 
      onClick={() => {
        { if (window.confirm('Are you sure you wish to delete this item?')) props.deleteNote(props.id) } 
      }}
      />
      </div>
      <div className="border border-b border-yellow-400/75 mb-3"></div>

      

      <p className="text-white text-balance line-clamp-2 sm:line-clamp-3  " >{props.content}</p>
      
    </div>
  );
}

export default Note;
