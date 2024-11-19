import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

   // Handle input changes
   const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };  

  const formSubmit=async(event)=>{
    event.preventDefault()
    
    const response=await fetch(`${import.meta.env.VITE_APP_BACKEND_URI}/login`,{
      method:'POST',
      headers:{'Content-type':"application/json"},
      body:JSON.stringify(formData)
    });
  const result = await response.json();
  console.log("Server Response:", result);
  }
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-700">
        
            <form onSubmit={formSubmit} className="flex flex-col items-center justify-center p-2 border border-transparent rounded-lg shadow-2xl bg-neutral-800 size-80" >
              <h1 className="text-2xl font-semibold text-green-400 pb-7 ">Login</h1>
            
            
            
            
            <input className="px-2 py-1 m-1 border border-transparent rounded-md 
            focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 w-72
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:border-transparent" 
             type="email" placeholder="Enter your email"required value={formData.email}
             onChange={handleChange} name="email"></input>
            
            
            
            
            
            <input className="px-2 py-1 m-1 mt-4 border border-transparent rounded-md w-72" type="password" placeholder="Enter your password"required value={formData.password}
          onChange={handleChange} name="password"></input> 
            <input className="w-56 px-3 py-1 my-4 bg-green-400 border border-transparent rounded-md cursor-pointer hover:" type="submit" value="Login"></input>
            
            <Link className="text-green-400 transition-all hover:scale-110" to="/register">Don't have an account? Register</Link>
            </form>
        
    </div>
  )
}

export default Login
