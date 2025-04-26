import React from 'react'
import "./noteCard.css"

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { RiFullscreenLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { fetchAllNotes, markNoteImportant } from '../../features/notes/notesThunks';
import { useDispatch } from 'react-redux';

const NoteCard = ({ note, viewFullNote }) => {

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // desctructring notes
    const { _id, title, description, isImportant, createdAt } = note;
    const dateObj = new Date(createdAt);

    // function to mark unmark note as important
    const markImportant = (id) => {
        dispatch(markNoteImportant(id))
        dispatch(fetchAllNotes())
    }

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
                        <span className='act_btn important' onClick={() => markImportant(_id)}>
                            {isImportant ? <FaStar /> : <FaRegStar />}
                        </span>

                        {/*  view full screen */}
                        <span className='act_btn view_full' onClick={() => viewFullNote(_id)}>
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