import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'
import { CartCard } from './features'

const Navbar = () => {
    const [showUser, setShowUser] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const { isAuthenticated, userData, logout } = useContext(AppContext)

    return (
        <nav className='w-100 bg-secondary-green d-flex flex-row justify-content-center z-over '>
            <div className="w-100 px-4 d-flex flex-row justify-content-between align-items-center">
                <img src="images/e-Dawa-logos_black.png" alt="" className='logo-img p-0 object-contain' />
                <div className="w-75 d-flex flex-row align-items-center justify-content-around pe-4 me-4 align-items-center gap-4">
                    <div className="nav-links d-flex flex-row justify-content-center align-items-center">

                        {
                            (userData !== null && userData.user_role == 'administrator') ?
                                <ul className="d-flex gap-4 flex-row justify-content-center align-items-center m-0 text-bold">
                                    <li className='nav-link'><Link to='/admin' className='text-dark fs-3 text-decoration-none'>ADMIN DASHBOARD</Link></li>
                                </ul>
                                :
                                <ul className="d-flex gap-4 flex-row justify-content-center align-items-center m-0 text-bold">
                                    <li className='nav-link '><Link to='/' className='fs-6 text-dark d-flex gap-2 text-decoration-none jcc aic'>
                                        <i className="fa-solid fa-home"></i>
                                        HOME</Link></li>
                                    <li className='nav-link'><Link to='/store' className='jcc aic text-dark fs-6 d-flex gap-2 text-decoration-none'>
                                        <i className="fa-solid fa-shop"></i>

                                        STORE</Link></li>
                                    {
                                        isAuthenticated && userData.role == 'administrator' ? <li className='nav-link'><Link to='/admin' className='jcc aic text-dark fs-6 text-bold text-decoration-none d-flex gap-2 text-decoration-none'>
                                            <i className="fa-solid fa-lock"></i>

                                            ADMINISTRATOR</Link></li>
                                            : <li
                                                onClick={() => setShowCart(!showCart)}
                                                className='nav-link mouse-pointer d-flex flex-row jcc aic gap-2 text-dark'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>


                                                CART
                                            </li>
                                    }

                                </ul>
                        }
                        {showCart && (userData !== null && userData.user_role !== 'administrator') !== 'administrator'  ? <CartCard toggleMethod={() => { setShowCart(false) }} /> : null}


                    </div>
                    {!isAuthenticated ?
                        <div className="d-flex gap-4 justify-content-end flex-row">
                            <Link to='/auth'><button className="btn d-flex  flex-row gap-2 btn-outline-dark px-4 rounded-0 text-bold">LOG IN
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>


                            </button></Link>
                        </div>
                        :
                        <div className='d-flex gap-4 flex-row align-items-center position-relative'>
                            <img
                                src="images/user.png"
                                alt=""
                                onClick={() => { setShowUser(!showUser) }}
                                className='user-img img-contain' />
                            {showUser && <div className="d-flex w-100 z-infinite flex-column bg-light p-3 rounded-1 my-2 position-absolute hover-item">
                                <h2 className="fs-6 text-capitalize text-dark text-bold text-info">{userData.username}</h2>
                                <hr className='m-1 p-0' />
                                <button className="btn btn-outline-danger fs-6 py-1" onClick={logout}>
                                    LOGOUT <i className="fa-solid fs-5 fa-power-off ps-3"></i>
                                </button>
                            </div>}
                        </div>}

                </div>
            </div>

        </nav >
    )
}

export default Navbar