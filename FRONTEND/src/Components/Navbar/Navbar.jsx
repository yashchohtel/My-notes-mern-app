import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../Searchbar/SearchBar';
import UserOptions from '../UserOptions/UserOptions';

import { FiSun } from "react-icons/fi";
import { IoClose, IoMoonOutline } from "react-icons/io5";
import { LuLogIn, LuUser } from "react-icons/lu";
import { PiRecycleBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { HiMiniBars2 } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import { changeNoteViewType, toggleAppTheme } from '../../features/theme/themeSlice';

const Navbar = ({ searchQuery, setSearchQuery }) => {

    // configure navigator
    const navigate = useNavigate();

    // configure useLocation
    const location = useLocation();

    // initilize use dispatch 
    const dispatch = useDispatch();

    // getting required Data from global store using useSelector
    const { user: logedUser, isAuthenticated } = useSelector((state) => state.auth);

    // state to store profile sub menu visible status
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // refrence to close the menu when clicked outside
    const menuRef = useRef(null);

    // setting page locations
    const isWelcome = location.pathname === "/";
    const isRegister = location.pathname === "/register";
    const isHome = location.pathname.startsWith("/home");
    const isAccount = location.pathname === "/user-account";
    const isEmailVerify = location.pathname.startsWith("/verify-email");
    const isAdmin = location.pathname === "/admin-page";
    const isImportent = location.pathname === "/important-notes";
    const isDeleted = location.pathname === "/deleted-notes";
    const isPassRess = location.pathname.startsWith("/change-password");

    // -------------------------

    // state to store sticky navbar status
    const [isSticky, setIsSticky] = useState(false);

    // getting required Data from global store using useSelector
    const { noteViewType, themeType } = useSelector((state) => state.theme);

    // toggle nove view type list or grid
    const handleNoteViewTypeToggle = () => {
        dispatch(changeNoteViewType(!noteViewType))
    }

    // -------------------------

    // toggle app theme dark or light
    const handleThemeToggle = () => {
        if (themeType === "dark") {
            dispatch(toggleAppTheme("light"))
        } else {
            dispatch(toggleAppTheme("dark"))
        }
    }

    // -------------------------

    // state to show hide searchbar
    const [showSearch, setShowSearch] = useState(false);

    // function to open searchbar
    const openSearchBar = () => {
        setShowSearch(true)
    }

    // function to close searchbar
    const closeSearchBar = () => {
        setShowSearch(false)
    }

    // -------------------------

    // state to show hide navigation menu
    const [showNavMenu, setShowNavMenu] = useState(false);

    // function to open NavMenu
    const togleNavMenu = () => {
        setShowNavMenu(!showNavMenu)
    }

    // function to close NavMenu
    const closeNavMenu = () => {
        setShowNavMenu(false)
    }

    // ------------------------

    // refrence to close navigation menu on cick outside 
    const navMenuRef = useRef(null);        // for .nevigationMenu
    const toggleBtnRef = useRef(null);      // for .navigationMenu_btn

    // effect ho close navmenu when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navMenuRef.current && !navMenuRef.current.contains(event.target) &&
                toggleBtnRef.current && !toggleBtnRef.current.contains(event.target)) {
                closeNavMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // -------------------------

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
                    <p className='nav_logo'>note nest</p>
                </div>

                {/* searchBar */}
                {(isHome || isAdmin) &&
                    <div className={`Search_Bar_Container ${showSearch ? "active" : ""}`} onClick={() => closeSearchBar()}>

                        {/* searchbar component */}
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                        {/* searchbar close button */}
                        <div className="searchBar_close" onClick={() => closeSearchBar()}> <IoClose /> </div>

                    </div>
                }

                {/* Right - Buttons */}
                <div className="navbar__right">

                    {/* navigation menu */}
                    <div className={`nevigationMenu ${showNavMenu ? 'active' : ''}`} ref={navMenuRef}>

                        {/* All note button */}
                        {isHome &&
                            <NavLink to="/home" end
                                onClick={() => closeNavMenu()}
                                className={({ isActive }) => `allNotes_btn nav_btn_container responsive ${isActive || location.pathname === "/home" ? "active" : ""}`}
                            >
                                {/* notes icon */}
                                <div className="navbar_circular_btn">
                                    <FaRegNoteSticky />
                                </div>

                                {/* link name */}
                                <p className="link_name">ALL NOTES</p>
                            </NavLink>
                        }

                        {/* important note button */}
                        {isHome &&
                            <NavLink to="/home/important-notes"
                                onClick={() => closeNavMenu()}
                                className={({ isActive }) => `important_btn nav_btn_container responsive ${isActive ? 'active' : ''}`}>

                                {/* star icon */}

                                <div className='navbar_circular_btn'>
                                    <FaRegStar />
                                </div>

                                {/* link name */}
                                <p className='link_name'>IMPORTENT NOTES</p>

                            </NavLink>
                        }

                        {/* recucle bin button */}
                        {isHome &&
                            <NavLink to="/home/deleted-notes"
                                onClick={() => closeNavMenu()}
                                className={({ isActive }) => `recycle_btn nav_btn_container responsive ${isActive ? 'active' : ''}`}>

                                {/* bin icon */}
                                <div className='navbar_circular_btn'>
                                    <PiRecycleBold />
                                </div>

                                {/* link name */}
                                <p className='link_name'>DELETED NOTES</p>

                            </NavLink>
                        }

                    </div>

                    {/* navigation icon */}
                    {(isHome || isImportent || isDeleted) &&
                        <div className="navigationMenu_btn nav_btn_container" onClick={() => togleNavMenu()} ref={toggleBtnRef}>

                            {/* sun/moon icon */}
                            <div className="navbar_circular_btn">
                                {showNavMenu ? <IoClose /> : <HiOutlineMenuAlt1 />}
                            </div>

                        </div>
                    }

                    {/* searchbar icon */}
                    {(isHome || isImportent || isDeleted || isAdmin) &&
                        <div className="searchbar_btn nav_btn_container" onClick={() => openSearchBar()}>

                            {/* sun/moon icon */}
                            <div className="navbar_circular_btn">
                                <IoSearch />
                            </div>

                        </div>
                    }

                    {/* layout button */}
                    {isHome &&
                        <div className="layout_btn nav_btn_container" onClick={() => handleNoteViewTypeToggle()}>

                            {/* grid icon */}
                            <div className="navbar_circular_btn">
                                {noteViewType ? <HiMiniBars2 /> : <IoGridOutline />}

                            </div>

                        </div>
                    }

                    {/* login button only on welcome page */}
                    {isWelcome &&
                        <button className="button_primary login-btn" onClick={() => navigate('/register?form=login')}>
                            Login <LuLogIn />
                        </button>
                    }

                    {/* home button */}
                    {(isEmailVerify || isAdmin || isAccount || (isPassRess && isAuthenticated)) &&
                        <NavLink to="/home" className="home_btn nav_btn_container">

                            {/* grid icon */}
                            <div className="navbar_circular_btn"> <IoHomeOutline /> </div>

                        </NavLink>
                    }

                    {/* theme toggle button */}
                    <div className="theme_toggle nav_btn_container" onClick={() => handleThemeToggle()}>

                        {/* sun/moon icon */}
                        <div className="navbar_circular_btn">

                            {themeType === "dark" ? <IoMoonOutline /> : <FiSun />}

                        </div>

                    </div>

                    {/* user profile button*/}
                    {(isHome || isAdmin || isAccount || (isPassRess && isAuthenticated)) &&
                        <div className="profile_btn nav_btn_container" ref={menuRef}>

                            {/* user button */}
                            <div className="navbar_circular_btn" onClick={() => setIsMenuVisible(prev => !prev)}>

                                {/* image or icon */}
                                {logedUser?.profileImage ?
                                    <img src={logedUser.profileImage} alt="user_img" />
                                    :
                                    <LuUser />
                                }

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