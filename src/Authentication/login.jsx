import React, { useContext, useRef } from 'react'
import { AppContext } from '../Contexts/AuthContext'
function Login(props) {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { loginUser } = useContext(AppContext)

  function handleLogin(e) {
    e.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    loginUser(loginData)

    passwordRef.current.value = '';
    emailRef.current.value = '';
  }

  const inputcss = 'input-wrapper d-flex flex-row align-items-center border rounded px-3 py-2'

  return (

    <div className="w-50 position-relative d-flex rounded-2 flex-column align-items-center p-4 gap-1 animate-in">
      <h1 className="display-5 d-flex flex-column text-dark w-75 border-bottom border-dark text-bold">Login here</h1>
      <form onSubmit={(e) => { handleLogin(e) }} className='w-75 d-flex flex-column text-light gap-4 py-4'>
        <div className={inputcss}>
          <i className="fa-solid fa-envelope text-dark fs-3"></i>
          <input type="email" ref={emailRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Email *' />
        </div>
        <div className={inputcss}>
          <i className="fa-solid fa-lock text-dark fs-3"></i>
          <input type="password" ref={passwordRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Password *' />
        </div>
        <span className='font-primary text-dark d-flex flex-row gap-2'>Don't have an account? <p className='text-info font-primary cursor-pointer' onClick={props.toggleAuth}>Sign up here.</p></span>

        <button className="btn btn-primary fs-6 rounded-0 text-bold w-50" onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div >
  )
}

export default Login