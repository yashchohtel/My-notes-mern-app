import React, { useEffect } from 'react'
import './admin.css'
import Navbar from '../../Components/Navbar/Navbar'
import { loadAllUsers } from '../../features/admin/adminThunks';
import { useDispatch, useSelector } from 'react-redux';
import { RiFileUserFill } from "react-icons/ri";
import { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';

import { RiAdminFill } from "react-icons/ri";
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserXmark } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import ConfirmBox from '../../Components/ConfirmBox/ConfirmBox';
import useAdminAction from '../../hooks/useAdminAction';
import useSearch from '../../hooks/useSearch';
import TableSkletenLoading from '../../Components/TableSkletenLoading/TableSkletenLoading';

const Admin = () => {

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // getting required Data from global store using useSelector
    const { user: logedUser } = useSelector((state) => state.auth);
    const { userData, loading } = useSelector((state) => state.admin);

    // state to show option status
    const [showOption, setShowOption] = useState(false);

    // state to store user id
    const [userId, setUserId] = useState(null);

    // getting all required state and actions functions to perform actions
    const {

        // related to confirmation actions
        confirmBoxOpen,
        whichPart,
        openConfirmBox,
        closeConfirmBox,
        handleConfirmAction,

    } = useAdminAction();

    // function to open admin option
    const openUserOption = () => {

        // set show option true
        setShowOption(true)

    }

    // function to close admin option
    const closeUserOption = () => {

        // set show option true
        setShowOption(false)

        // set userId to null
        setUserId(null);
    }

    // handle admin actions
    const handleAdminAction = (actionType) => {

        // to set id and actino to promote user to admin
        if (actionType === "proUserToAdmin") {
            return openConfirmBox(userId, actionType)
        }

        // to set id and actino to promote user to admin
        if (actionType === "proUserToSupAdmin") {
            return openConfirmBox(userId, actionType)
        }

        // to set id and actino to promote user to admin
        if (actionType === "demAdminToUser") {
            return openConfirmBox(userId, actionType)
        }

        // to set id and actino to promote user to admin
        if (actionType === "permDeleteUser") {
            return openConfirmBox(userId, actionType)
        }

    }

    // state to store search Query getting from useSearch hook
    const {
        searchQuery,
        setSearchQuery

    } = useSearch()

    const searchedUser = userData.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    // load user data and auth state 
    useEffect(() => {
        dispatch(loadAllUsers());
    }, [dispatch]);


    return (
        <section className='admin_section_container'>

            {/* navbar Component */}
            <Navbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* user data table display section */}
            <div className="userTable_display_sec">

                {/* confirmation box modal (to confirm execution of task) */}
                {confirmBoxOpen &&
                    <div className="ConfirmBox_container" onClick={() => closeConfirmBox()}>

                        <div className="confirm_box">

                            <ConfirmBox
                                closeConfirmBox={closeConfirmBox} // function to close confirm box
                                handleConfirmAction={handleConfirmAction} // function to handle action confirmation
                                whichPart={whichPart} // confirmation box msg
                                closeUserOption={closeUserOption}
                            />

                        </div>

                    </div>
                }

                {/* admin option component */}
                {showOption &&
                    <div className="adminOption_container"
                        onClick={() => closeUserOption()}
                    >
                        <ul className="adminOption" onClick={(e) => e.stopPropagation()}>

                            <li className="option" onClick={() => handleAdminAction("proUserToAdmin")}>
                                <span> <RiAdminFill /> </span> Promote User To Admin
                            </li>

                            <li className="option" onClick={() => handleAdminAction("proUserToSupAdmin")}>
                                <span> <MdAdminPanelSettings /> </span> Promote User To Superadmin
                            </li>

                            <li className="option" onClick={() => handleAdminAction("demAdminToUser")}>
                                <span> <FaUserCheck /> </span> Demote Admin To User
                            </li>

                            <li className="option" onClick={() => handleAdminAction("permDeleteUser")}>
                                <span> <FaUserXmark /> </span> Delete User Account
                            </li>

                            <span className="close_model"
                                onClick={() => closeUserOption()}
                            > <IoClose /> </span>
                        </ul>
                    </div>
                }

                {/* heading */}
                <h1 className='admin_heading'>ALL USERS DATA <RiFileUserFill /> </h1>

                {/* table */}
                <div className="table_section">

                    <table>

                        {/* table heading */}
                        <thead>
                            <tr>
                                <th className='sno'><span>S. No.</span></th>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Verified</th>
                                <th>Notes</th>
                                {logedUser?.role.includes("superadmin") && <th className='th-action'>Actions</th>}
                            </tr>
                        </thead>

                        {/* table body */}
                        <tbody>

                            {loading ?

                                <TableSkletenLoading /> :

                                (searchedUser.length === 0 ?

                                    (<tr>
                                        <td colSpan={logedUser?.role.includes("superadmin") ? 8 : 7} style={{ textAlign: "center", color: "gray", padding: "1rem" }}>
                                            No such user found...
                                        </td>
                                    </tr>)
                                    :
                                    (searchedUser.slice().reverse().map((user, index) => (
                                        <tr key={user._id}>
                                            <td className='sno'>{index + 1}.</td>
                                            <td>{user.username}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role?.filter((role) => role === "user" || user.role.includes(role)).join(", ")}</td>
                                            <td>{user.isAccountVerified? "Yes": "No"}</td>
                                            <td>{user.activeNotes}</td>
                                            {logedUser?.role.includes("superadmin") &&
                                                <td className='td-btn-cell'>
                                                    <button className='table-btn button_primary'
                                                        onClick={() => {
                                                            openUserOption()
                                                            setUserId(user._id)
                                                        }}
                                                    >
                                                        ACTIONS <IoMdSettings />
                                                    </button>
                                                </td>
                                            }

                                        </tr>
                                    )))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </section>
    )
}

export default Admin;

{/* <button className='table-btn button_primary'>ACTIONS <IoMdSettings /> </button> */ }