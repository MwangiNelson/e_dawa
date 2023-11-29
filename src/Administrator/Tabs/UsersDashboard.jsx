import React, { useContext, useEffect, useRef, useState } from 'react';
import { userCategories } from '../data';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Contexts/AuthContext';


function UserDashboard(props) {
    const [users, setUsers] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null)
    const [delUser, setDeleteUser] = useState(null)
    const [admins, setAdmins] = useState(0)
    // const [unverifiedCount, setUnverifiedCount] = useState(0);


    const fetchUsers = async (params) => {
        const url = `http://127.0.0.1:8000/api/users`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.data);

                const adminCount = data.data.filter(user => user.user_role === 'administrator').length;
                setAdmins(adminCount)
                console.log(data.data);
            } else {
                console.log('Data could not be fetched.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    };


    const countValues = [(users.length), admins]



    useEffect(() => {
        fetchUsers();

    }, []);



    async function deleteUser() {


        const url = `http://127.0.0.1:8000/api/delete_user/${delUser.id}`;
        console.log(url)
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('User deleted successfully!')
                fetchUsers()
                setDeleteUser(null)

            } else {
                alert('User could not be deleted.');
                setDeleteUser(null)
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }

    const ConfirmDeleteCard = () => {
        // console.log('Deleted user :', deleteUser)
        return (
            <div className="w-100 vh-100 d-flex bg-blur flex-column jcc aic position-fixed top-0 right-100">
                <div className="w-50 bg-dark p-3 rounded d-flex flex-column jcc aic gap-3">
                    <h4 className='text-light tac'>Are you sure you want to delete <br /> <span className='fs-5 text-bold underline px-2 m-0 py-0'>{delUser.user_name}</span> from the database?</h4>
                    <small className='text-light'>This action is irreversible.</small>
                    <div className="d-flex flex-row gap-2">
                        <button
                            onClick={deleteUser}
                            className="btn btn-danger">Delete</button>
                        <button
                            onClick={() => { setDeleteUser(null) }}
                            className='btn btn-primary'>Cancel</button>
                    </div>

                </div>
            </div>
        )
    }


    const DashCard = (props) => {
        return (
            <div
                className={`w-50 gap-3 btn btn-light rounded-2 shadow-lg border-secondary d-flex flex-column pt-2 px-4 tas ais ${tabIndex == props.index ? 'bg-primary-green' : ''} `}
                onClick={props.method}
            >
                
                <h1 className={`display-2 font-mono ${props.index == tabIndex ? 'text-dark ' : 'text-dark'}  text-bold`}>{countValues[props.index] < 10 ? '0' : null}{countValues[props.index]} <small className='fs-3 font-mono'> {props.title} </small></h1>
            </div>
        );
    };

    const UserEditor = () => {
        const newUsernameRef = useRef(null)
        const newEmailRef = useRef(null)
        const newRoleRef = useRef(null)
        const newTokenRef = useRef(null)

        const { updateUser } = useContext(AppContext)


        function generateRandomToken() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+';
            let token = '';

            for (let i = 0; i < 16; i++) {
                // Generate a random index to select a character from the characters string
                const randomIndex = Math.floor(Math.random() * characters.length);

                // Add the selected character to the token
                token += characters.charAt(randomIndex);

                // Add a hyphen after every 4 characters
                if ((i + 1) % 4 === 0 && i < 15) {
                    token += '-';
                }
            }

            if (newTokenRef.current) {
                newTokenRef.current.value = token
            }
            return
        }

        function updateUserData(e) {
            e.preventDefault()

            const userData = {
                user_name: newUsernameRef.current.value || selectedUser.user_name,
                user_email: newEmailRef.current.value || selectedUser.user_email,
                user_role: newRoleRef.current.value || selectedUser.user_role,
                user_token: newTokenRef.current.value || selectedUser.user_token
            }


            updateUser(userData, selectedUser.id)
            // console.log(userData)
            setSelectedUser(null)
            fetchUsers()
        }



        return (
            <div className="w-100 top-0 start-0 min-height-100  position-fixed bg-blur animate-in d-flex jcc aic">
                <div className="w-50 bg-dark rounded border shadow-lg ">
                    <h3 className="fs-3 text-bold py-3 px-4 text-light border-0 border-bottom border-secondary"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon mx-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                        Edit User</h3>
                    <form
                        onSubmit={updateUserData}
                        className='w-100 pb-4 d-flex flex-column gap-2 p-3 align-items-end'>
                        <div className="d-flex flex-row gap-3 w-100 jsb">
                            <label htmlFor=""
                                className='font- text-light fs-6 px-4 tac'
                            >Name :</label>
                            <input
                                type="text"
                                placeholder={selectedUser ? selectedUser.user_name : null}
                                ref={newUsernameRef}
                                className='form-control w-75 border-secondary bg-transparent placeholder-light font- text-light py-0 fs-5'
                            />
                        </div>
                        <div className="d-flex flex-row gap-3 w-100 jsb">
                            <label htmlFor="" className='font- text-light fs-6 px-4 tac'>Email :</label>
                            <input
                                type="email"
                                placeholder={selectedUser ? selectedUser.user_email : null}
                                className='form-control w-75 border-secondary bg-transparent placeholder-light font- text-light py-0 fs-5'
                                ref={newEmailRef}
                            />
                        </div>
                        <div className="d-flex flex-row gap-3 w-100 jsb">
                            <label htmlFor="" className='font- text-light fs-6 px-4 tac'>User Token :</label>
                            <div className="d-flex flex-row gap-2 w-75">
                                <input
                                    type="text"
                                    placeholder={selectedUser ? selectedUser.user_token : null}
                                    className='form-control w-75 border-secondary bg-transparent placeholder-light font- text-light py-0 fs-6'
                                    ref={newTokenRef}
                                />
                                <button
                                    type='button'
                                    onClick={generateRandomToken}
                                    className="btn w-25 btn-warning d-flex jcc aic gap-2 fs-sm flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="icon">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>

                                    Renew token
                                </button>
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-3 w-100 jsb">
                            <label htmlFor=""
                                className='font- text-light fs-6 px-4 tac'
                            >Role :</label>
                            <select name=""
                                ref={newRoleRef}
                                className='form-control border-secondary bg-transparent fs-6 placeholder-light  font- text-light w-75'
                                id="">
                                {
                                    roles.map((role) => {
                                        return (
                                            <option value={role}
                                                className='font- text-light' selected={role == selectedUser.role} >{role}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-75 d-flex flex-row  gap-4">
                            <button
                                className="btn btn-primary font- text-light"
                                type='submit'
                            >SAVE CHANGES
                                <i className="fa-solid ps-3 fa-floppy-disk"></i>
                            </button>
                            <button
                                onClick={() => { setSelectedUser(null) }}
                                className="btn btn-outline-danger px-4 font-" type='button'>CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    console.log(tabIndex)

    const roles = [
        'user',
        'administrator',

    ]

    return (
        <div className='w-100 d-flex flex-column position-relative py-4'>
            {
                selectedUser ? <UserEditor /> : null
            }{
                delUser ? <ConfirmDeleteCard /> : null
            }
            <div className="w-100 d-flex flex-row aic jsb">
                <h2 className="display-4 pt-3">USERS & ADMINISTRATORS</h2>
                <button
                    onClick={props.method}
                    className="btn btn-outline-dark rounded-1">ADD NEW USER</button>

            </div>
            <div className='d-flex flex-row py-4 gap-4'>
                {userCategories.map((category, index) => {
                    return (
                        <DashCard
                            key={index}
                            title={category}
                            method={() => {
                                setTabIndex(index);
                            }}
                            index={index}
                        />
                    );
                })}
            </div>
            <div className='p-4 w-100 d-flex flex-column rounded border shadow-lg'>
                <h3 className='fs-3'>Administrator table view</h3>
                <p className='text-secondary font-primary'>
                    Please operate carefully, data is pretty sensitive
                </p>

                <table className='table pt-4 font-primary'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col' className=''>
                                Name
                            </th>
                            <th scope='col' className='w-25 tac'>
                                Email
                            </th>
                            <th scope='col' className='tac'>
                                User Token
                            </th>
                            <th className='tac'>Role</th>
                            <th scope='col' className='tac'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope='row' className='fs-6'>
                                        {index + 1}
                                    </th>
                                    <td className='fs-6'>{user.user_name}</td>
                                    <td className='fs-6 tac'>{user.user_email}</td>
                                    <td className='fs-6 tac d-flex flex-row'>
                                        <p className="overflow-ellipsis fs-6">{user.user_token}</p>
                                        <button className="btn btn-outline-secondary p-0 h-fit border-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                            </svg>

                                        </button>

                                    </td>
                                    <td className='fs-6 tac text-capitalize text-bold'>{user.user_role.toString()}</td>


                                    <td>
                                        <div className='d-flex flex-row-reverse jcc aic gap-4'>
                                            <button
                                                className={`btn gap-3 fs-6 p-0 py-1 px-3 d-flex jcc aic flex-row ${user.is_banned ? 'btn-success' : 'btn-danger'
                                                    }`}
                                                onClick={() => setDeleteUser(user)}
                                            >

                                                <i className={`fa-solid fa-trash-can fs-5`}></i>
                                            </button>
                                            <button
                                                className='btn btn-warning gap-3 fs-6 py-1 p-0 px-3 d-flex jcc aic flex-row'
                                                onClick={() => { setSelectedUser(user) }}
                                            >
                                                Edit
                                                <i className='fa-solid fa-pen fs-6'></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDashboard;
