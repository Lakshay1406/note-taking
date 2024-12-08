import React from 'react'
import { useNavigate } from "react-router-dom";
const NavBar = (props) => {
const navigate = useNavigate();
  return (
    <div className="text-yellow-500 backdrop-blur-sm p-5 flex font-mono text-2xl shadow-xl " >
        <h1 className=" hover:text-yellow-300 cursor-pointer"onClick={(e)=>{
            e.preventDefault();
            navigate('/');
        }}>YellowPages</h1> 
        {props.logout?
        <button onClick={(props.logout)} className="bg-zinc-800 text-sm text-yellow-500 ml-auto rounded-md p-1 px-2 hover:text-white">Logout</button>:
        <></>}

      </div> 
  )
}

export default NavBar
