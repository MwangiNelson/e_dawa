import React, { useContext, useRef } from 'react'
import { AppContext } from '../Contexts/AuthContext';

function Registration(props) {

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const { registerUser } = useContext(AppContext)

  const handleRegister = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;

    // Perform actions with form data
    registerUser(username, email, password, confirm);

    // Reset the form
    usernameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    confirmRef.current.value = '';
  };
  const inputcss = 'input-wrapper d-flex flex-row align-items-center border rounded px-3 py-2'

  return (

    <div className="w-50 position-relative d-flex rounded-2 flex-column align-items-center p-4 gap-2 animate-in">
      <h1 className="display-5 d-flex flex-column text-dark w-75 border-bottom border-dark text-bold">Create an account.</h1>
      <form onSubmit={handleRegister} className='w-75 d-flex flex-column text-dark gap-3 pb-4'>
        <div className={inputcss}>
          <i className="fa-solid fa-user text-dark fs-3"></i>
          <input type="text" ref={usernameRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Username *' />
        </div>
        <div className={inputcss}>
          <i className="fa-solid fa-envelope text-dark fs-3"></i>
          <input type="email" ref={emailRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Email *' />
        </div>
        <div className={inputcss}>
          <i className="fa-solid fa-lock text-dark fs-3"></i>
          <input type="password" ref={passwordRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Password *' />
        </div>
        <div className={inputcss}>
          <i className="fa-solid fa-key text-dark fs-3"></i>
          <input type="password" ref={confirmRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Confirm *' />
        </div>
        <p className='font-primary d-flex flex-row gap-2'>Already have an account? <p className='text-info cursor-pointer' onClick={props.toggleAuth} >Sign in here.</p></p>

        <button className="btn btn-primary fs-6 text-bold rounded-1 w-50" onClick={handleRegister}>
          SUBMIT
        </button>

      </form>
    </div>

  )
}

export default Registration