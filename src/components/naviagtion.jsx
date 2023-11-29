import { Routes, Route } from "react-router-dom";
import React, { useContext } from 'react'
import { AppContext } from "../Contexts/AuthContext";

import Home from "../screens/home";
import AuthWrapper from "../Authentication/auth";
import SignUpVolunteer from "../Volunteer/signup";
import AdminPanel from "../Administrator/admin";
import Store from "../screens/store";
// import ProtestView from "../screens/protest_view";


export const NavigationRoutes = () => {
    const { isAuthenticated, userData } = useContext(AppContext)


    return (
        <Routes>
            <Route path="/" element={(userData !== null && userData.role == 'administrator') ? <Home /> : <Home />} />
            <Route path="/admin" element={(userData !== null && userData.role == 'administrator') ? <AdminPanel /> : <AuthWrapper />} />
            <Route path="/admin-registration" element={(userData !== null && userData.role == 'administrator') ? <AuthWrapper /> : <Home />} />

            {/* {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/store" element={<Store />} />
            <Route path="/auth" element={<AuthWrapper />} />

            <Route path="/register-volunteer" element={<SignUpVolunteer />} />
        </Routes>
    );
}