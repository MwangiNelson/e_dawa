import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'
import UserDashboard from './Tabs/UsersDashboard'
import DrugsListing from './Tabs/DrugsListing'
import GeneralDashboard from './general_dashboard'
import NewItem from './Tabs/NewDrug'
import NewCategory from './Tabs/NewCategory.jsx';
import NewUser from './Tabs/NewUser'



function AdminPanel() {
  const [tab, setTab] = useState(0)
  const dashboards = [<GeneralDashboard />, <NewItem />, <NewCategory />, <DrugsListing method={() => { setTab(1) }} />, <NewUser method = {()=>setTab(5)} />, <UserDashboard method={() => { setTab(4) }} />]
  return (
    <div className='w-100 bg-webflow d-flex flex-row p-1'>
      <nav className='w-25 h-sidenav d-flex flex-row rounded-3 justify-content-center z-over border-0 border-bottom border-secondary border-1'>
        <div className="w-100 d-flex flex-column">
          <div className="flex flex-col p-2 bg-secondary-green">
            <div className="d-flex flex-column rounded-2 border-bottom py-3 mb-2 px-3">
              <button
                onClick={() => setTab(0)}
                className='btn-outline-dark border-0 rounded-1 fs-5 text-bold btn w-100 d-flex flex-row aic gap-3 py-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
                Dashboard
              </button>
            </div>
             {/* Users Management */}
            <div className="flex flex-column rounded-2 py-3 mt-2 px-3">
              <div className="d-flex flex-row gap-2 aic border-bottom py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon text-dark">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>

                <h3 className='text-dark text-bold fs-5 m-0 p-0'>User Management</h3>
              </div>
              <div className="flex flex-column">
                <ul className='py-1 px-0 m-0 list-style-none d-flex flex-column gap-2'>
                  <li className=''>
                    <button
                      onClick={() => { setTab(4) }}
                      className='btn-outline-light border-0 rounded-1 btn w-100 d-flex flex-row aic gap-3 py-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                      Add new user</button>
                  </li>
                  <li className=''>
                    <button
                      onClick={() => { setTab(5) }}
                      className='btn-outline-light border-0 rounded-1 btn w-100 d-flex flex-row aic gap-3 py-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                      View Users</button>
                  </li>
                  
                </ul>
              </div>
            </div>
            {/* Drug management Tab */}
            <div className="flex flex-column rounded-2 py-3 px-3">
              <div className="d-flex flex-row gap-2 aic border-bottom py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon text-dark">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                </svg>
                <h3 className='text-dark text-bold fs-5 m-0 p-0'>Drug Management</h3>
              </div>
              <div className="flex flex-column">
                <ul className='py-1 px-0 m-0 list-style-none d-flex flex-column gap-2'>
                  <li className=''>
                    <button
                      onClick={() => { setTab(1) }}
                      className='btn-outline-light border-0 rounded-1 btn w-100 d-flex flex-row aic gap-3 py-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                      Add new drug</button>
                  </li>
                  <li className=''>
                    <button
                      onClick={() => { setTab(2) }}
                      className='btn-outline-light border-0 rounded-1 btn w-100 d-flex flex-row aic gap-3 py-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                      Add new category</button>
                  </li>
                  <li className=''>
                    <button
                      onClick={() => { setTab(3) }}
                      className='btn-outline-light border-0 rounded-1 btn w-100 d-flex flex-row aic gap-3 py-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                      View drugs</button>
                  </li>
          
               
                </ul>
              </div>
            </div>

          


          </div>
        </div>
      </nav>
      <div className="w-100 min-height-100 px-3">
        {dashboards[tab]}
      </div>

    </div>
  )
}

export default AdminPanel



