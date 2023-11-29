import React, { useRef, useContext, useState, useEffect } from 'react'
import { AppContext } from '../../Contexts/AuthContext';


function NewUser(props) {
    const inputcss = 'input-wrapper d-flex flex-row align-items-center border rounded px-3 py-2'


    const userNameRef = useRef(null)
    const userRoleRef = useRef(null)
    const userEmailRef = useRef(null)
    const passwordRef = useRef(null)

    const [categories, setCategories] = useState([])
    const { registerUser } = useContext(AppContext)

    function handleSubmit(e) {
        e.preventDefault();

        const userData = {
            user_role: userRoleRef.current.value,
            user_name: userNameRef.current.value,
            user_password: passwordRef.current.value,
            user_email: userEmailRef.current.value
        }
        console.log(userData)

        registerUser(userData.user_name, userData.user_email, userData.user_password, userData.user_role)

        userRoleRef.current.value = ''
        passwordRef.current.value = ''
        userEmailRef.current.value = ''
        userNameRef.current.value = ''

    }
    const getCategories = async () => {
        const url = `http://127.0.0.1:8000/api/all_categories`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data.data);
                console.log('Data fetch successful:', data);

                return true
            } else {
                alert('Data could not be fetched.');
            }
        } catch (error) {
            alert('Error:', error);
        }
    }
    useEffect(() => {
        getCategories()
    }, [])


    function generateRandomPassword(length = 14) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";
        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        // Assuming passwordRef is a ref to an input field
        if (passwordRef.current) {
            passwordRef.current.value = password;
        }

        console.log(password);
    }

    return (
        <div className="w-100  d-flex flex-column p-2 rounded-2">
            <div className="d-flex flex-row-reverse py-4">
                <button 
                onClick={props.method}
                className="btn btn-outline-dark">
                    VIEW ALL USERS
                </button>   
            </div>
            <div className="border rounded-2 pb-4  bg-light">
                <h2 className='px-3 py-4 border-bottom text-bold'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class='icon  me-4'>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>

                    Add New User</h2>
                <div className="w-100 d-flex flex-column px-3">
                    <form
                        onSubmit={handleSubmit}
                        className='d-flex flex-row w-100 gap-4 p-2'>

                        <div className="w-75 d-flex flex-column gap-2">
                            <h5 className='fs-3'>Fill In User Details</h5>
                            <div className={inputcss}>
                                <i className="fa-solid fa-user"></i>
                                <input type="text" ref={userNameRef} required className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='User Name *' />
                            </div>
                            <div className={inputcss}>
                                <i className="fa-solid fa-list"></i>
                                <select placeholder='User role *' className='form-control bg-transparent border-0' ref={userRoleRef} id="">
                                    <option value="" disabled selected>Select User Role *</option>
                                    <option value="user">User</option>
                                    <option value="administrator">Administrator</option>


                                </select>
                            </div>
                            <div className={inputcss}>
                                <i className="fa-solid fa-envelope"></i>
                                <input type="email" required ref={userEmailRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='User email *' />
                            </div>
                            <div className="d-flex flex-row gap-2">
                                <div className={inputcss + ' w-100'}>
                                    <i className="fa-solid fa-key"></i>
                                    <input type="text" ref={passwordRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='User password *' />
                                </div>
                                {/* <button
                                    onClick={() => generateRandomPassword()}
                                    className={'btn btn-warning w-25 text-bold d-flex flex-row gap-2 jcc aic'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>

                                    Auto generate
                                </button> */}
                            </div>


                            <small id="emailHelp" class="form-text text-muted">User tokens are auto generated. Copy from user Overview.</small>
                            <button className="btn btn-primary w-25 text-bold" type='submit'>
                                Add User
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewUser