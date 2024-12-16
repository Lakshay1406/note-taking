import { useState } from 'react'
import Inputfield from './Inputfield'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
const Register = () => {

  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading,setLoading]=useState(false);
  const [errorEmail,setErrorEmail]=useState(false);
  const [errorPassword,setErrorPassword]=useState(false);
   // Handle input changes
   const handleChange = (event) => {
    
    
    const { name, value } = event.target;
    if (name==="email") setErrorEmail(false);
    const updatedForm={ ...formData, [name]: value };
    setFormData(updatedForm);
    if(updatedForm.password!=="" &&  updatedForm.confirmPassword!=="" && 
      updatedForm.password!==updatedForm.confirmPassword){
      setErrorPassword(true);
    }
    else{
      setErrorPassword(false);
    }
  };  

  const formSubmit=async(event)=>{
    event.preventDefault();
    
    setLoading(true);
    if(formData.password!=formData.confirmPassword){
      setLoading(false);
      setErrorPassword(true);
      return //alert("There is a variation between the two passwords.");
    }
    const response=await fetch(`${import.meta.env.VITE_APP_BACKEND_URI}/register`,{
      method:'POST',
      headers:{'Content-type':"application/json"},
      body:JSON.stringify(
        {
          email:formData.email,
          password:formData.password
        }
      )
    });
    const result=await response.json();
    //console.log("Server Response:", result);
    if(result.status === "success"){
      localStorage.setItem("user", JSON.stringify(result.data));
      return navigate("/notes")
    }
    setLoading(false);
    //alert(result.message);
    //console.log(result.message);
    setErrorEmail(true);

  }

  return (
    <div className="bg-[url('/bookbg2.jpg')] bg-cover bg-center h-screen flex flex-col">
      <NavBar />
    <div className="flex items-center justify-center h-screen">
      
      <form onSubmit={formSubmit} className="flex flex-col items-center justify-center p-2  rounded-lg shadow-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 size-72 sm:size-80" >

      <h1 className="text-2xl font-semibold text-white pb-7 ">Register</h1>
      
      {errorEmail && (
            <div className="text-red-500 text-sm">Email already exists.</div>
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
            <div className="text-red-500 text-sm">Passwords do not match</div>
      )}
      <Inputfield 
      type="password" 
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      name="password"
      highlight={errorPassword}
      />

      <Inputfield 
      type="password" 
      placeholder="Confirm your password"
      value={formData.confirmPassword}
      onChange={handleChange}
      name="confirmPassword"
      highlight={errorPassword}
      />
      
      <button className={` w-48 sm:w-56 px-3 py-1 my-4 bg-yellow-500 border border-transparent rounded-md cur ${loading?'cursor-auto':'cursor-pointer'} active:bg-yellow-600`}
      disabled={loading}>
        {loading?<div className="flex items-center justify-center"><div className="w-5 h-5 mr-2 border-4 border-t-4 border-white border-b-transparent rounded-full animate-spin"></div>Loading</div>:<div>Register</div>}
        </button>


        <Link className="text-white transition-all hover:scale-110 hover:text-yellow-500" to="/login">Already resitered?</Link>
      </form>
    </div>
    </div>
  )
}

export default Register
