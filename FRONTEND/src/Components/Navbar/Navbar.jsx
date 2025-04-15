import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

import { LuLogIn } from "react-icons/lu";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = ({ hideLoginButton }) => {

    // configure navigator
    const navigate = useNavigate();

    // state to store sticky navbar status
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 12) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={isSticky ? "navbar sticky" : "navbar"}>

                {/* Left - Logo area */}
                
                <div className="navbar__left" onClick={() => navigate("/")}>
                    <img src="/logo1.png" alt="logo" />
                    <p>note nest</p>
                </div>

                {/* Right - Buttons */}
                <div className="navbar__right">

                    {/* lgin button showing conditionaly */}
                    {!hideLoginButton &&
                        <button className="button_primary login-btn" onClick={() => navigate('/register')}>
                            Login <LuLogIn />
                        </button>
                    }

                    {/* theme toggle button */}
                    <button className="theme_toggle"><MdOutlineLightMode /></button>

                </div>

            </nav>
        </>
    )
}

export default Navbar