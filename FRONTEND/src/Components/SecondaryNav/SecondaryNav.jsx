import React from 'react'
import './SecondaryNav.css'
import { FiFilter } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const SecondaryNav = ({ title, count, openModel }) => {
    return (
        <>
            <div className="second_nav">

                {/* secondary nav left */}
                <div className="sec_nav_left">
                    <p className='notes_count'>{title} - <span>{count}</span></p>
                </div>

                {/* secondary nav right */}
                <div className="sec_nav_right">

                    {/* delete all notes button */}
                    <button className="button_primary deleteAll-btn" onClick={() => openModel()}>
                        add note  <FaPlus />
                    </button>

                    {/* filter drop down */}
                    <div className="notes-filter-dropdown">

                        {/* filter drop down button */}
                        <button className="button_primary">
                            Filter by <FiFilter className="filter-icon" />
                        </button>

                        {/* filter drop down option */}
                        <ul className="filter-options">
                            <li>Newest First</li>
                            <li>Oldest First</li>
                            <li>Last 7 Days</li>
                            <li>Last 30 Days</li>
                        </ul>

                    </div>

                    {/* delete all notes button */}
                    <button className="button_primary deleteAll-btn">
                        DELETE ALL  <MdDelete />
                    </button>

                </div>

            </div>
        </>
    )
}

export default SecondaryNav