import React from 'react'
import "./userOptions.css";
import { useDispatch, useSelector } from 'react-redux';

import { FaUserCircle } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { logoutAccount } from '../../features/auth/authThunks';
import { logoutUser } from '../../features/auth/authSlice';


const UserOptions = () => {

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // function to handle logout
    const handleLogout = () => {
        dispatch(logoutAccount());
        dispatch(logoutUser())
    };


    return (
        <>
            <div className="userProfile_container">

                {/* user details */}
                <div className="user_details">

                    <div className="userInfo">
                        <span> <FaUserCircle /> </span>
                        <p>YASH CHOHTEL</p>
                    </div>

                    <p className='profileLink'> see your account </p>

                </div>

                <div className="user_options verify_account">

                    <span className="optionIcon"> <IoMdCheckmarkCircleOutline /> </span>

                    <div className="optionInfo">
                        <h3>verify Account</h3>
                        <span className='optionInfoIcon'> <IoIosArrowForward /> </span>
                    </div>

                </div>

                <div className="user_options admin_panel">

                    <span className="optionIcon"> <MdAdminPanelSettings /> </span>

                    <div className="optionInfo">
                        <h3>admin panel</h3>
                        <span className='optionInfoIcon'> <IoIosArrowForward /> </span>
                    </div>

                </div>

                <div className="user_options logout_buttton">

                    <button className='button_primary' onClick={() => handleLogout()}>logout <LuLogOut /> </button>

                </div>

            </div>
        </>
    )
}

export default UserOptions