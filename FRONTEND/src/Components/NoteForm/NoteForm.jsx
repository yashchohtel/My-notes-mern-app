import React from 'react'
import "./noteForm.css"

import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';

const NoteForm = ({ noteFormData, handleInputChange, submitNoteForm, closeNoteFormModel, isEditing }) => {

    return (
        <div className="add_note_model" onClick={() => closeNoteFormModel()}>

            <form className="notesForm" onSubmit={(e) => submitNoteForm(e)} onClick={(e) => e.stopPropagation()} >

                <input
                    type="text"
                    placeholder="Enter your note title..."
                    name="title"
                    required
                    value={noteFormData.title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="Write your note here..."
                    name="description"
                    required
                    value={noteFormData.description}
                    onChange={handleInputChange}
                />

                <button type="submit" className="button_primary">{isEditing ? "EDIT NOTE" : "ADD NOTE"}</button>

                <span className="close_model" onClick={() => closeNoteFormModel()}> <IoClose /> </span>

            </form>

        </div>
    )
}

export default NoteForm