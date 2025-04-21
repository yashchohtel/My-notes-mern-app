import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../Searchbar/SearchBar';
import UserOptions from '../UserOptions/UserOptions';

import { LuLogIn } from "react-icons/lu";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { PiRecycleBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";



const Navbar = () => {

    // configure navigator
    const navigate = useNavigate();

    // configure useLocation
    const location = useLocation();

    // state to store profile sub menu visible status
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // refrence to close the menu when clicked outside
    const menuRef = useRef(null);

    // getting required data from global store using useSelector
    const { user } = useSelector((state) => state.auth);

    // setting page locations
    const isWelcome = location.pathname === "/";
    const isRegister = location.pathname === "/register";
    const isHome = location.pathname.startsWith("/home");

    // state to store sticky navbar status
    const [isSticky, setIsSticky] = useState(false);

    // use effect ho handle show hide of scroll bar
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

    // use effect to close the menu when clicked outside
    useEffect(() => {

        // function to handle click outside the menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuVisible(false);
            }
        };

        // adding event listener to document to handle click outside the menu
        document.addEventListener("mousedown", handleClickOutside);

        // removing event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <>
            <nav className={isSticky ? "navbar sticky" : "navbar"}>

                {/* Left - Logo area */}
                <div className="navbar__left" onClick={() => navigate("/")}>
                    <img src="/logo1.png" alt="logo" />
                    <p>note nest</p>
                </div>

                {/* searchBar */}
                {isHome &&
                    <div className="Search_Bar_Container">

                        {/* searchbar component */}
                        <SearchBar />

                    </div>
                }

                {/* Right - Buttons */}
                <div className="navbar__right">

                    {/* All note button */}
                    {isHome &&
                        <div className="allNotes_btn nav_btn_container">

                            {/* notes icon */}
                            <NavLink to="/home"
                                end
                                className={({ isActive }) => `navbar_circular_btn ${(isActive || location.pathname === "/home") ? 'active' : ''}`}>
                                <FaRegNoteSticky />
                            </NavLink>

                        </div>
                    }

                    {/* important note button */}
                    {isHome &&
                        <div className="important_btn nav_btn_container">

                            {/* star icon */}
                            <NavLink to="/home/important-notes" className={({ isActive }) => `navbar_circular_btn ${isActive ? 'active' : ''}`}> <FaRegStar /> </NavLink>

                        </div>
                    }

                    {/* recucle bin button */}
                    {isHome &&
                        <div className="recycle_btn nav_btn_container">

                            {/* bin icon */}
                            <NavLink to="/home/deleted-notes" className={({ isActive }) => `navbar_circular_btn ${isActive ? 'active' : ''}`}> <PiRecycleBold /> </NavLink>

                        </div>
                    }

                    {/* layout button */}
                    {isHome &&
                        <div className="layout_btn nav_btn_container">

                            {/* grid icon */}
                            <div className="navbar_circular_btn"> <IoGridOutline /> </div>

                        </div>
                    }

                    {/* login button only on welcome page */}
                    {isWelcome &&
                        <button className="button_primary login-btn" onClick={() => navigate('/register')}>
                            Login <LuLogIn />
                        </button>
                    }

                    {/* theme toggle button */}
                    <div className="theme_toggle nav_btn_container">

                        {/* sun/moon icon */}
                        <div className="navbar_circular_btn"> <MdOutlineLightMode /> </div>

                    </div>

                    {/* user profile button*/}
                    {isHome &&
                        <div className="profile_btn nav_btn_container" ref={menuRef}>

                            {/* user button */}
                            <div className="navbar_circular_btn" onClick={() => setIsMenuVisible(prev => !prev)}>
                                <LuUser />
                            </div>

                            {/* Sub Menu */}
                            <div className={`${isMenuVisible ? "visible user_profile_sub_menu" : "user_profile_sub_menu"}`}>

                                {/* user profile */}
                                <UserOptions />

                            </div>

                        </div>
                    }

                </div>

            </nav >
        </>
    )
}

export default Navbar