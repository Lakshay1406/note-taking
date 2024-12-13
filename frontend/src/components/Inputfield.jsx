import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


const Inputfield = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="relative">
        <input
          className="px-2 py-1 m-1 border border-transparent rounded-md bg-zinc-900 text-white  
            focus:outline-none focus:ring-2 focus:ring-yellow-500  w-60 sm:w-72
             focus:invalid:border-transparent"
          type={isPasswordVisible ? 'text' : props.type}  
          placeholder={props.placeholder}
          required
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          autoComplete="on"
        />
        
        {props.type === 'password' && (  // Only show the toggle button for password fields
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400 text-opacity-40 hover:text-opacity-70"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaRegEye/> : <FaRegEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Inputfield;
