import React from 'react'

const Inputfield = (props) => {
  return (
    <div>
      <input className="px-2 py-1 m-1 border border-transparent rounded-md bg-zinc-900 text-white  
            focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 w-60 sm:w-72
             focus:invalid:border-transparent" 
             type={props.type} 
             placeholder={props.placeholder}
             required 
             value={props.value}
             onChange={props.onChange} 
             name={props.name}
             autocomplete="on"
             >
             
        </input>
    </div>
  )
}

export default Inputfield
