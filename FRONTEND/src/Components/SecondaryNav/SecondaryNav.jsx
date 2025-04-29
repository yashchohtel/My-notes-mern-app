import React from 'react'
import './SecondaryNav.css'
import { FiFilter } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const SecondaryNav = ({ title, count, openNoteFormCreate, openConfirmBox }) => {

    // configure navigator
    const navigate = useNavigate();

    // configure useLocation
    const location = useLocation();

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    return (
        <>
            <div className="second_nav">

                {/* secondary nav left */}
                <div className="sec_nav_left">
                    <p className='notes_count'>{title} - <span>{count}</span></p>
                </div>

                {/* secondary nav right */}
                <div className="sec_nav_right">

                    {/* add task button */}
                    <button className="button_primary deleteAll-btn" onClick={() => openNoteFormCreate()}>
                        add note  <FaPlus />
                    </button>

                    {/* filter drop down */}
                    <div className={`notes-filter-dropdown ${notes.length !== 0 ? 'notes-filter-dropdown-hover' : ''}`}>

                        {/* filter drop down button */}
                        <button className="button_primary" disabled={notes.length === 0}>
                            Filter by <FaFilter className="filter-icon" />
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
                    <button className="button_primary deleteAll-btn"
                        onClick={() => openConfirmBox(null, "secondaryNavDeleteAllNote")}
                        disabled={notes.length === 0}>
                        DELETE ALL  <MdDelete />
                    </button>

                </div>

            </div>
        </>
    )
}

export default SecondaryNav