import React from 'react'
import "./noteCard.css"

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { RiFullscreenLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const NoteCard = ({ note }) => {

    const { title, description, isImportant, createdAt } = note;
    const dateObj = new Date(createdAt);

    return (
        <>
            {/* notes card */}
            <div className="note_card">

                {/* heading */}
                <h2 className='note_heading'> {title} </h2>

                {/* description */}
                <p className='note_desc'> {description} </p>

                {/* action button and info */}
                <div className="action_info">

                    {/* action buttons */}
                    <div className="act_buttons">

                        {/* important mark */}
                        <span className='act_btn important'>
                            {isImportant ? <FaStar /> : <FaRegStar />}

                        </span>

                        {/*  view full screen */}
                        <span className='act_btn view_full'>
                            <RiFullscreenLine />
                        </span>

                        {/* edit note */}
                        <span className='act_btn edit'>
                            <MdEdit />
                        </span>

                        {/* delete notes */}
                        <span className='act_btn delete'>
                            <MdDelete />
                        </span>

                    </div>

                    <p className="info">
                        {`${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`}
                    </p>

                </div>

            </div>
        </>
    )
}

export default NoteCard