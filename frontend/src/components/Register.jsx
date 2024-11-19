import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div>
      <form>
        <h1>Register</h1>
        <Link to="/login">Already resitered?</Link>
      </form>
    </div>
  )
}

export default Register
