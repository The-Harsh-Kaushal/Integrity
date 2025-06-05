import React from 'react'
import Authentication from '../components/Authentication'
import { useNavigate } from 'react-router-dom'
import './style/login.css'
import Navbar from '../components/Navbar'

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className='fullscr'>
        <Navbar/>
        <div className='main' >

       <Authentication
            title='Sign Up'
            buton='Sign Up'
            switchText="Already have an account? Login"
            enableName={true}
            onSwitch={() => navigate('/login')}
            URL = "http://localhost:5000/api/auth/signup"
          />
        </div>
    </div>
  )
}

export default Signup