import React, { use, useState } from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import "./allNotes.css";
import NoteCard from '../../Components/NoteCard/NoteCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IoClose } from "react-icons/io5";
import { createNote } from '../../features/notes/notesThunks';

const AllNotes = () => {

    // configure useNavigate to navigate 
    const navigate = useNavigate();

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // state to store show hide add note model status
    const [showAddModel, setShowAddModel] = useState(false)

    // function to open notes enter model
    const openModel = () => {
        setShowAddModel(true)
    }

    // function to close model
    const closeModel = () => {

        setShowAddModel(false)

        setNoteFormData({ title: "", description: "" })

    }

    // state for storing form data
    const [noteFormData, setNoteFormData] = useState({
        title: "",
        description: ""
    });

    // function to handle form data change
    const handleInputChange = (e) => {

        // destructuring name and value from event target
        const { name, value } = e.target;

        // updating form data state with the new value
        setNoteFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    // for handling form submit 
    const addNote = (e) => {

        // preventing default form submission
        e.preventDefault();

        // dispatch createNote action
        dispatch(createNote(noteFormData));

        // close form after submit
        closeModel();

        // gets latest updated notes
        dispatch(fetchAllNotes());

    }

    return (
        <>

            {/* all notes container */}
            <div className="allNotesContainer">

                {/* popup model to add notes */}
                {showAddModel &&
                    <div className="add_note_model">


                        {/* notes form */}
                        <form className="notesForm" onSubmit={(e) => addNote(e)}>

                            {/* for title */}
                            <input
                                type="text"
                                placeholder='Enter your note title...'
                                name='title'
                                required
                                value={noteFormData.title}
                                onChange={handleInputChange}
                            />

                            {/* for description */}
                            <textarea
                                placeholder='Write your note here...'
                                name="description"
                                required
                                value={noteFormData.description}
                                onChange={handleInputChange}
                            />

                            {/* submit button */}
                            <button type='submit' className="button_primary"> ADD NOTE </button>

                            {/* popup close btn */}
                            <span className="close_model" onClick={() => closeModel()}> <IoClose /> </span>

                        </form>

                    </div>
                }

                {/* secondary nav */}
                <SecondaryNav title="All Notes" count={notes.length} openModel={openModel} />

                {notes.length === 0 ?

                    <p className="no_notes">ADD YOUR NOTES AND TASKS</p>

                    :

                    (<div className="notes_display_sec">

                        {/* note card */}
                        {notes && notes.map((note) => (
                            <NoteCard key={note._id} note={note} />
                        ))}

                    </div>)

                }




            </div>

        </>
    )
}

export default AllNotes