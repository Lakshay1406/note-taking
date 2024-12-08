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

   // Handle input changes
   const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };  

  const formSubmit=async(event)=>{
    event.preventDefault();
    if(formData.password!=formData.confirmPassword){
      return alert("not same passwords");
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
    console.log("Server Response:", result);
    if(result.status === "success"){
      localStorage.setItem("user", JSON.stringify(result.data));
      return navigate("/notes")
    }
    alert(result.message);
  }

  return (
    <div className="bg-[url('/bookbg2.jpg')] bg-cover bg-center h-screen flex flex-col">
      <NavBar />
    <div className="flex items-center justify-center h-screen">
      
      <form onSubmit={formSubmit} className="flex flex-col items-center justify-center p-2  rounded-lg shadow-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 size-72 sm:size-80" >

      <h1 className="text-2xl font-semibold text-white pb-7 ">Register</h1>

      <Inputfield 
      type="email" 
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
      name="email"
      />
      <Inputfield 
      type="password" 
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      name="password"
      />

      <Inputfield 
      type="password" 
      placeholder="Confirm your password"
      value={formData.confirmPassword}
      onChange={handleChange}
      name="confirmPassword"
      />
      
      <input className="w-48 sm:w-56 px-3 py-1 my-4 bg-yellow-500 border border-transparent rounded-md cursor-pointer hover:" type="submit" value="Register"></input>


        <Link className="text-white transition-all hover:scale-110 hover:text-yellow-500" to="/login">Already resitered?</Link>
      </form>
    </div>
    </div>
  )
}

export default Register
