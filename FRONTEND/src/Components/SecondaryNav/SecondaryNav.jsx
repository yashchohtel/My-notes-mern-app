import React from 'react'
import './SecondaryNav.css'
import { MdFilterAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MdRestoreFromTrash } from "react-icons/md";


const SecondaryNav = ({ title, count, openNoteFormCreate, openConfirmBox }) => {

    // configure useLocation
    const location = useLocation();

    // getting required Data from global store using useSelector
    const { notes, deletedNotes } = useSelector((state) => state.notes);

    // extrecting all notes which is important
    const importantNotes = notes.filter(note => note.isImportant === true);

    // setting page locations
    const isHome = location.pathname === "/home";
    const isImportant = location.pathname === '/home/important-notes'
    const isDeleted = location.pathname === '/home/deleted-notes'


    // function to handle different request of delete all notes
    const handleAllDelete = () => {

        // if home page delete button
        if (isHome) {
            return openConfirmBox(null, "secondaryNavDeleteAllNote")
        }

        // if important page delete button
        if (isImportant) {
            return openConfirmBox(null, "secondaryNavDeleteAllImpNote")
        }

        // if recyclebin page delete button
        if (isDeleted) {
            return openConfirmBox(null, "secondaryNavDeleteAllDelNote")
        }
    }

    return (
        <>
            <div className="second_nav">

                {/* secondary nav left */}
                <div className="sec_nav_left">
                    <p className='notes_count'>{title} - <span>{count}</span></p>
                </div>

                {/* secondary nav right */}
                <div className="sec_nav_right">

                    {/* Add Note Button - Shown based on page location and notes length */}
                    {(isHome || (isImportant && notes.length === 0) || (isDeleted && notes.length === 0 && deletedNotes.length === 0)) && (
                        <button className="button_primary deleteAll-btn" onClick={openNoteFormCreate}>
                            Add Note <FaPlus className="button-icon" />
                        </button>
                    )}

                    {(notes.length > 0 && !isDeleted) && (
                        <div
                            className={`notes-filter-dropdown 
                                ${isHome || (isImportant && importantNotes.length > 0) ? 'notes-filter-dropdown-hover' : ''}`}
                        >
                            <button
                                className="button_primary"
                                disabled={isImportant && importantNotes.length === 0}
                            >
                                Filter by <MdFilterAlt className="button-icon" />
                            </button>

                            <ul className="filter-options">
                                <li>Newest First</li>
                                <li>Oldest First</li>
                                <li>Last 7 Days</li>
                                <li>Last 30 Days</li>
                            </ul>
                        </div>
                    )}

                    {/*soft delete all note button */}
                    {(notes.length >= 2 && !isDeleted) && (
                        <button
                            className="button_primary deleteAll-btn"
                            onClick={() => handleAllDelete()}
                            disabled={isImportant && importantNotes.length < 2}
                        >
                            DELETE ALL <MdDelete className="button-icon" />
                        </button>
                    )}

                    {/* permanent delete all note button */}
                    {(isDeleted && deletedNotes.length > 0) && (
                        <button
                            className="button_primary deleteAll-btn"
                            onClick={() => openConfirmBox(null, "secondaryNavResAll")}
                        >
                            RESTORE ALL <MdRestoreFromTrash className="button-icon" />
                        </button>
                    )}

                    {/* permanent delete all note button */}
                    {(isDeleted && deletedNotes.length > 0) && (
                        <button
                            className="button_primary deleteAll-btn"
                            onClick={() => openConfirmBox(null, "secondaryNavPermDelAllNote")}
                        >
                            EMPTY BIN <MdDelete className="button-icon" />
                        </button>
                    )}

                </div>

            </div>
        </>
    )
}

export default SecondaryNav