import React from 'react'
import './SecondaryNav.css'
import { FiFilter } from "react-icons/fi";

const SecondaryNav = ({ title, count }) => {
    return (
        <>
            <div className="second_nav">

                {/* secondary nav left */}
                <div className="sec_nav_left">
                    <p className='notes_count'>{title} - <span>{count}</span></p>
                </div>

                {/* secondary nav right */}
                <div className="sec_nav_right">

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
                        DELETE ALL
                    </button>

                </div>

            </div>
        </>
    )
}

export default SecondaryNav