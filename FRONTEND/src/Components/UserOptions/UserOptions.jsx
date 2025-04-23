import React from 'react'
import "./userOptions.css";
import { useDispatch, useSelector } from 'react-redux';

import { FaUserCircle } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { logoutAccount, sendVerificationOtp } from '../../features/auth/authThunks';
import { logoutUser } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';


const UserOptions = () => {

    // configure useNavigate to navigate 
    const navigate = useNavigate();

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // getting required data from global store using useSelector
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // descturing values from usre object
    const { isAccountVerified, role } = user;

    // function to handle logout
    const handleLogout = () => {
        dispatch(logoutAccount());
        dispatch(logoutUser())
    };

    return (
        <>
            <div className="userProfile_container">

                {/* user account profile */}
                <Link to="/user-account" className="user_options verify_account">

                    <span className="optionIcon"> <FaUserCircle /> </span>

                    <div className="optionInfo">
                        <h3>Your Account</h3>
                        <span className='optionInfoIcon'> <IoIosArrowForward /> </span>
                    </div>

                </Link>

                {/* vefify email */}
                {!isAccountVerified &&
                    <div className="user_options verify_account" onClick={() => navigate("/verify-email")}>

                        <span className="optionIcon"> <IoMdCheckmarkCircleOutline /> </span>

                        <div className="optionInfo">
                            <h3>verify Account</h3>
                            <span className='optionInfoIcon'> <IoIosArrowForward /> </span>
                        </div>

                    </div>
                }

                {/* go to admin page */}
                {isAuthenticated && role?.includes("admin") &&
                    <div className="user_options admin_panel">

                        <span className="optionIcon"> <MdAdminPanelSettings /> </span>

                        <div className="optionInfo">
                            <h3>admin panel</h3>
                            <span className='optionInfoIcon'> <IoIosArrowForward /> </span>
                        </div>

                    </div>
                }

                {/* logout button */}
                <div className="user_options logout_buttton">

                    <button className='button_primary' onClick={() => handleLogout()}>logout <LuLogOut /> </button>

                </div>

            </div>
        </>
    )
}

export default UserOptions