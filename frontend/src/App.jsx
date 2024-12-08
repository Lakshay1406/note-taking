
import Login from "./components/login"
import { Link } from "react-router-dom"
import NavBar from "./components/NavBar"
function App() {
    return (
    <>
    <div className="bg-[url('/bookbg2.jpg')] bg-cover bg-center h-screen  ">
    <div className="bg-gradient-to-r  from-black/80 from-10% via-transparent to-transparent flex flex-col h-screen">
    <NavBar />
    
      <div className="p-5 sm:p-16 md:p-20 lg:p-28 flex  items-start justify-center flex-col h-full">
        <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl ">Notes That Stay with You,<br></br> Always.</h1>
        <h1 className="text-white text-2xl font-thin mt-6 ">Create, update, and delete your notes with ease,<br></br> keeping them with you wherever you go.</h1>
        <Link to="/login" className="mt-6 font-mono font-extrabold  border border-yellow-500 rounded-md p-2  hover:bg-yellow-500 text-yellow-500 hover:text-gray-800 active:bg-gray-800 active:text-white">Get Started</Link>
        {/* <Link to="/register" className="font-mono font-extrabold sm:m-6 border border-gray-600 rounded-md p-2  hover:bg-gray-600 hover:text-white active:bg-gray-800">Register</Link> */}
        
      </div>
    </div>
    </div>
    
    </>
  )
}

export default App
