import React from 'react'
import './viewFullNote.css'

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';

const ViewFullNote = ({ fullViewNoteId, closeViewModal, markImportant, openNoteFormEdit, moveOneNoteToBin }) => {

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    // getting note via id to display full screen
    const noteDataToFullView = notes.find((note) => note._id === fullViewNoteId);

    // desctructring notes
    const { _id, title, description, isImportant, createdAt, updatedAt } = noteDataToFullView;

    // creating date object to show date accordingly
    const dateObjCreated = new Date(createdAt);
    const dateObjUpdated = new Date(updatedAt);

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
                        {createdAt !== updatedAt &&
                            ("Last Updated: " + `${dateObjUpdated.getDate()}/${dateObjUpdated.getMonth() + 1}/${dateObjUpdated.getFullYear()}`)
                        }
                    </p>

                </div>

                {/* action btn */}
                <div className="action_btn">

                    <span className='action important' onClick={() => markImportant(_id)}>
                        {isImportant ? <FaStar /> : <FaRegStar />}
                    </span>

                    <span className='action edit' onClick={() => openNoteFormEdit(_id)}>
                        <MdEdit />
                    </span>

                    <span className='action delete' onClick={() => moveOneNoteToBin(_id)}>
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