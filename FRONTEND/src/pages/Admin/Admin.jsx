import React, { useEffect } from 'react'
import './admin.css'
import Navbar from '../../Components/Navbar/Navbar'
import { loadAllUsers } from '../../features/admin/adminThunks';
import { useDispatch, useSelector } from 'react-redux';
import AdminOption from '../../Components/AdminOption/adminOption';
import { RiFileUserFill } from "react-icons/ri";
import { useState } from 'react';


const Admin = () => {

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // getting required Data from global store using useSelector
    const { user: logedUser } = useSelector((state) => state.auth);
    const { userData } = useSelector((state) => state.admin);

    // state to show option status
    const [showOption, setShowOption] = useState(null);

    const openUserOption = () => {
        setShowOption(true)
    }

    const closeUserOption = () => {
        setShowOption(false)
    }

    // load user data and auth state
    useEffect(() => {
        dispatch(loadAllUsers());
    }, [dispatch]);


    return (
        <section className='admin_section_container'>

            {/* navbar Component */}
            <Navbar />

            {/* user data table display section */}
            <div className="userTable_display_sec">

                <h1 className='admin_heading'>ALL USERS DATA <RiFileUserFill /> </h1>

                <div className="table_section">

                    <table>

                        {/* table heading */}
                        <thead>
                            <tr>
                                <th className='sno'><span>S. No.</span></th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Total Notes</th>
                                {logedUser?.role.includes("superadmin") && <th className='th-action'>Actions</th>}
                            </tr>
                        </thead>

                        {/* table body */}
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={user._id}>
                                    <td className='sno'>{index + 1}.</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role?.filter((role) => role === "user" || user.role.includes(role))
                                        .join(", ")
                                    }</td>
                                    <td>{user.activeNotes}</td>
                                    {logedUser?.role.includes("superadmin") &&
                                        <td className='td-btn-cell'>
                                            <AdminOption setShowOption={setShowOption} />
                                        </td>
                                    }

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

        </section>
    )
}

export default Admin;

{/* <button className='table-btn button_primary'>ACTIONS <IoMdSettings /> </button> */ }