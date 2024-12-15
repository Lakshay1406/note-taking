import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Inputfield from "./Inputfield";



const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading]=useState(false);
  const [errorEmail,setErrorEmail]=useState(false);
  const [errorPassword,setErrorPassword]=useState(false);
   // Handle input changes
   const handleChange = (event) => {
    const { name, value } = event.target;
    if (name==="email") setErrorEmail(false);
    setErrorPassword(false);
    const updatedForm={ ...formData, [name]: value };
    setFormData(updatedForm);

  };  

  const formSubmit=async(event)=>{
    event.preventDefault()
    setLoading(true);
    const response=await fetch(`${import.meta.env.VITE_APP_BACKEND_URI}/login`,{
      method:'POST',
      headers:{'Content-type':"application/json"},
      body:JSON.stringify(formData)
    });
  const result = await response.json();
  
  console.log("Server Response:", result);
  
  if(result.status === "success"){
    localStorage.setItem("user", JSON.stringify(result.data));
    return navigate("/notes")
  }
  setLoading(false);
  if(result.message==="Invalid password.") setErrorPassword(true);
  else if(result.message==="Email does not exist.") setErrorEmail(true);
  else{
    alert(result.message);
  }
  
  }
  return (
    <div className="bg-[url('/bookbg2.jpg')] bg-cover bg-center h-screen flex flex-col">
     <NavBar />
      
    <div className="flex items-center justify-center h-screen "  >

            <form onSubmit={formSubmit} className="flex flex-col items-center justify-center p-2 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-lg shadow-2xl bg-zinc-700 size-72 sm:size-80 " >
              <h1 className="text-2xl font-semibold text-white pb-7 ">Login</h1>

              {errorEmail && (
            <div className="text-red-500 text-sm">Email is not registered.</div>
      )}
            <Inputfield 
            type="email" 
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            highlight={errorEmail}
            />
             {errorPassword && (
            <div className="text-red-500 text-sm">Incorrect Password.</div>
             )}
            <Inputfield 
            type="password" 
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            highlight={errorPassword}
            />
                
            <button className={`w-48 sm:w-56 px-3 py-1 my-4 bg-yellow-500 border border-transparent rounded-md 
            cursor-pointer ${loading ? "opacity-85 cursor-default" : ""}`} disabled={loading}
            >
            {loading?<div className="flex items-center justify-center"><div className="w-5 h-5 mr-2 border-4 border-t-4 border-white border-b-transparent rounded-full animate-spin"></div>Loading</div>:"Login"}
            </button>
            <Link className="text-white transition-all hover:scale-110 hover:text-yellow-500" to="/register">Don't have an account? Register</Link>
            </form>
        
    </div>
    </div>
    
  )
}

export default Login
