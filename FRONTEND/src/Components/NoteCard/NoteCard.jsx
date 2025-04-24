import React from 'react'
import "./noteCard.css"

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { RiFullscreenLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const NoteCard = () => {

    

    return (
        <>
            {/* notes card */}
            <div className="note_card">

                {/* heading */}
                <h2 className='note_heading'> work till death </h2>

                {/* description */}
                <p className='note_desc'>Work plays a vital role in our lives as it gives us purpose, direction, and a sense of accomplishment. It helps us grow personally and professionally, while also contributing to our family and society.</p>

                {/* action button and info */}
                <div className="action_info">

                    {/* action buttons */}
                    <div className="act_buttons">

                        {/* important mark */}
                        <span className='act_btn important'>
                            <FaRegStar />
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

                    <p className="info">12/23/24</p>

                </div>

            </div>
        </>
    )
}

export default NoteCard