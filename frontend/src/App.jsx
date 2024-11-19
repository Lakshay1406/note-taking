
import Login from "./components/login"
import { Link } from "react-router-dom"
function App() {
    return (
    <>
      <div className="flex h-screen items-center justify-center flex-col">

        <h1 className="  font-mono font-extrabold text-4xl mb-5">notes taking app</h1>
        <div>
        <Link to="/login" className="font-mono font-extrabold m-6 border border-gray-600 rounded-md p-2 hover:bg-gray-600 hover:text-white active:bg-gray-800">Login</Link>
        <Link to="/register" className="font-mono font-extrabold m-6 border border-gray-600 rounded-md p-2  hover:bg-gray-600 hover:text-white active:bg-gray-800">Register</Link>
        </div>
      </div>

    </>
  )
}

export default App
