import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'


const Footer = () => {
  const { isAuthenticated, userData, logout } = useContext(AppContext)


  return (
    <div className="w-100 bg-primary-green d-flex flex-column jcc bg-dark ">
      <div className="w-100 px-4 d-flex flex-row jsb">
        <div className="w-25 d-flex flex-column aic">
          <img src="images/e-Dawa-logos_white.png" alt="" className='w-25 logo-img' />
        </div>

        <div className="w-25 d-flex justify-content-end pe-4 me-4 align-items-end">
          <h4 className="text-light fs-6">
            Sole property of <b>e-Dawa©</b>
                   </h4>
        </div>
      </div>
      <div className="w-100 border-top py-2 px-4 d-flex flex-row-reverse">
        <div className="p-2 py-4 d-flex flex-column">
          <h5 className='text-light fs-xsm'>KERI RD, 300-7969 NAIROBI KENYA</h5>
          <p className='text-light fs-xsm m-0 p-0 d-flex gap-3'><b>TEL:</b><span>(+254) 7123 456 789 | (+254) 7123 456 789</span></p>
        </div>
      </div>
    </div>
  )
}

export default Footer