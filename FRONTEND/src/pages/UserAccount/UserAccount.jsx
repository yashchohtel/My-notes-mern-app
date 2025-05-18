import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./userAccount.css"
import { FaCircleUser } from "react-icons/fa6";

const UserAccount = () => {
    return (
        <>
            {/* user accont congainer */}
            <div className="user_acount_container">

                {/* navbar component */}
                <Navbar />

                {/* profile section */}
                <div className="userPrifile_section">

                    {/* heading */}
                    <h1 className='user_profile_heading'> your account </h1>

                </div>

            </div>
        </>
    )
}

export default UserAccount