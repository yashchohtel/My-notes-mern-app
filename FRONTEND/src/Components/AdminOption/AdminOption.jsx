import React from 'react'
import { IoMdSettings } from "react-icons/io";

const AdminOption = () => {

    return (
        <>
            <div className="adminOption_container">

                {/* admin action button */}
                <button className='table-btn button_primary'>ACTIONS <IoMdSettings /> </button>



            </div>
        </>
    )
}

export default AdminOption