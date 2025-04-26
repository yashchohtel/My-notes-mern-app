import React from 'react'
import './viewFullNote.css'

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { fetchAllNotes, markNoteImportant } from '../../features/notes/notesThunks';
import { useDispatch, useSelector } from 'react-redux';

const ViewFullNote = ({ fullvViewNoteId, closeViewModal }) => {

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    // getting note via id to display full screen
    const noteData = notes.find((note) => note._id === fullvViewNoteId);

    // desctructring notes
    const { _id, title, description, isImportant, createdAt, updatedAt } = noteData;

    // creating date object to show date accordingly
    const dateObjCreated = new Date(createdAt);
    const dateObjUpdated = new Date(updatedAt);

    // getting only date to chekc if both are equal or not
    const onlyDateCreated = createdAt.split('T')[0];
    const onlyDateUpdated = updatedAt.split('T')[0];

    // function to mark unmark note as important
    const markImportant = (id) => {
        dispatch(markNoteImportant(id))
        dispatch(fetchAllNotes())
    }

    return (
        <>
            <div className='view_full_note' onClick={(e) => e.stopPropagation()}>

                {/* title */}
                <h3 className='head'>{title}:</h3>

                {/* desc */}
                <p className='desc'>{description}</p>

                {/* time info */}
                <div className="time_info">

                    <p className="createdAt">
                        Created At: {`${dateObjCreated.getDate()}/${dateObjCreated.getMonth() + 1}/${dateObjCreated.getFullYear()}`}
                    </p>

                    <p className="updatedAt">
                        {onlyDateCreated !== onlyDateUpdated &&
                            ("Last Updated: " + `${dateObjUpdated.getDate()}/${dateObjUpdated.getMonth() + 1}/${dateObjUpdated.getFullYear()}`)
                        }
                    </p>

                </div>

                {/* action btn */}
                <div className="action_btn">

                    <span className='action important' onClick={() => markImportant(_id)}>
                        {isImportant ? <FaStar /> : <FaRegStar />}
                    </span>

                    <span className='action edit'>
                        <MdEdit />
                    </span>

                    <span className='action delete'>
                        <MdDelete />
                    </span>

                </div>

                <span className="close" onClick={() => closeViewModal()}>
                    <IoClose />
                </span>

            </div>
        </>
    )
}

export default ViewFullNote