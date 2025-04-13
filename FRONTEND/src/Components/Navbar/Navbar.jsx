import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

import { LuLogIn } from "react-icons/lu";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {

    // configure navigator
    const navigate = useNavigate();


    return (
        <>
            <nav className="navbar">

                {/* Left - Logo area */}
                <div className="navbar__left">
                    <img src="/logo.png" alt="logo" />
                    <p>note nest</p>
                </div>

                {/* Right - Buttons */}
                <div className="navbar__right">

                    <button className="button_primary login-btn" onClick={() => navigate('/login')}>
                        Login <LuLogIn />
                    </button>

                    <button className="theme_toggle"><MdOutlineLightMode /></button>

                </div>

            </nav>
        </>
    )
}

export default Navbar