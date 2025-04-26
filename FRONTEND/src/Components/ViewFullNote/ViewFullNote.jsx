import React from 'react'
import './viewFullNote.css'

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ViewFullNote = ({ viewNoteData, closeViewModal }) => {
    console.log(viewNoteData);

    // desctructring notes
    const { _id, title, description, isImportant, createdAt } = viewNoteData;
    const dateObj = new Date(createdAt);

    return (
        <>
            <div className='view_full_note' onClick={(e) => e.stopPropagation()}>

                {/* title */}
                <h3 className='head'>{title}:</h3>

                {/* desc */}
                <p className='desc'>{description}</p>

                {/* time info */}
                <div className="time_info">
                    <p className="createdAt"> Created At: 12/12/12</p>
                    <p className="updatedAt">Last Updated: 12/12/12</p>
                </div>

                {/* action btn */}
                <div className="action_btn">

                    <span className='action important'>
                        <FaRegStar />
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