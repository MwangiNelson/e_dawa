import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'

export const Landing = () => {


  const { isAuthenticated } = useContext(AppContext)
  return (
    <div className='w-100 bg-primary-green d-flex justify-content-center'>
      <div className="w-100 d-flex flex-column aic position-relative">
        <div className="w-100 ">
          <img src="images/doc.jpg" className='w-100 vh-75 img-cover' alt="" />
        </div>
        <div className="w-75 z-top position-absolute p-4 d-flex flex-column gap-4 justify-content-center h-100">
          <div className="d-flex flex-row w-100 jcc aic">
            <h2 className='display-1 text-primary tac py-4'>Get healthy the smart way <br /> <b className='text-secondary-green'>with e-dawa</b> </h2>
          </div>
          <p className='font-primary w-50 py-4 text-light'>Welcome to the next generation medical services ready to tend tou your medical needs immediately.</p>
          <div className="d-flex flex-row w-100 justify-content-start gap-4">
            <Link className='w-fit text-decoreation-none' to={isAuthenticated ? '/store' : '/auth'}>
              <button className="btn btn-outline-light w-fit rounded-0 px-4 py-2 text-bold fs-6 d-flex flex-row gap-2 align-items-center" >
                BUY MEDICINE
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>

              </button>
            </Link>
            <Link to={'/'}>
              <button className="btn btn-outline-primary rounded-0 px-4 text-bold py-2 fs-6 d-flex flex-row gap-2 align-items-center">
                READ OUR BLOG
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
