import React from 'react'

const Inputfield = (props) => {
  return (
    <div>
      <input className="px-2 py-1 m-1 border border-transparent rounded-md 
            focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 w-72
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:border-transparent" 
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
