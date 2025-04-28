import React, { useState } from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import "./allNotes.css";
import NoteCard from '../../Components/NoteCard/NoteCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createNote, fetchAllNotes, markNoteImportant, softDeleteNote, updateNote } from '../../features/notes/notesThunks';
import ViewFullNote from '../../Components/ViewFullNote/ViewFullNote';
import NoteForm from '../../Components/NoteForm/NoteForm';

const AllNotes = () => {

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    /* ----------- create note ------------------------------- */

    // state to store show hide add note model status
    const [showAddModel, setShowAddModel] = useState(false)

    // function to open note form to create note
    const openNoteFormCreate = () => {
        setShowAddModel(true) // open note form for create note
    }

    // function to close model for create and edit 
    const closeNoteFormModel = () => {

        setShowAddModel(false) // close model
        setIsEditing(false) // close editin

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

    // for handling form submit for create and edit
    const submitNoteForm = (e) => {

        // preventing default form submission
        e.preventDefault();

        // performing task according to create or edit
        if (!isEditing) {

            // dispatch createNote action 
            dispatch(createNote(noteFormData)).then(() => dispatch(fetchAllNotes()))

        } else {

            // dispatch updateNote action
            dispatch(updateNote({ editNoteId, noteFormData })).then(() => dispatch(fetchAllNotes()))

            // show note full preview after edit
            if (viewNoteModalEdit) {
                viewFullNote(editNoteId);
            }

        }

        // close form after submit
        closeNoteFormModel();

    }

    /* ----------- edit note ------------------------------- */

    // state to store editing status
    const [isEditing, setIsEditing] = useState(false);

    // state to store note id to edit
    const [editNoteId, setEditNoteId] = useState(null);

    // function to open note form to edit note
    const openNoteFormEdit = (id) => {

        // show modal
        setShowAddModel(true)

        // set editing status true
        setIsEditing(true)

        // set id of note to edit
        setEditNoteId(id)

        // close view mode if click button click on view full note
        closeViewModal()

        // getting note via id to edit 
        const noteToEdit = notes.find((note) => note._id === id);

        setNoteFormData({
            title: noteToEdit?.title,
            description: noteToEdit?.description,
        })

    }

    /* ----------- mark note important ------------------------------- */

    // function to mark unmark note as important
    const markImportant = (id) => {
        dispatch(markNoteImportant(id)).then(() => dispatch(fetchAllNotes()))
    }

    /* ----------- view note full screen -------------------------------*/

    // state to store viewNote modal open and close 
    const [viewNoteModal, setViewNoteModal] = useState(false);

    // state to open model if edited via full Preview
    const [viewNoteModalEdit, setViewNoteModalEdit] = useState(false);

    // state to store note data for full screen view
    const [fullViewNoteId, setFullViewNoteId] = useState(null);

    // function to view note on full screen
    const viewFullNote = (id) => {

        // send note id to fetch latest data in viewFullNote component
        if (id) {
            setFullViewNoteId(id);
            setViewNoteModal(true)
            setViewNoteModalEdit(true)
        }
    }

    // function to close full screen popup
    const closeViewModal = () => {
        setViewNoteModal(false)
    }

    /* ----------- soft delete one note ------------------------------- */

    // function to soft delete (move to recycle bin)
    const moveOneNoteToBin = (id) => {

        dispatch(softDeleteNote(id)).then(() => dispatch(fetchAllNotes()));

        // close note view model if note is delete from view full note
        closeViewModal();

    }

    /* ----------- soft delete all note ------------------------------- */

    // function to soft delete all note at once
    const moveAllNoteToBin = () => {
        
    }

    return (
        <>

            {/* all notes container */}
            <div className="allNotesContainer">

                {/* model to add notes */}
                {showAddModel &&
                    <NoteForm
                        noteFormData={noteFormData} // note data (create)
                        handleInputChange={handleInputChange} // handle input change (create / edit)
                        submitNoteForm={submitNoteForm} // submit note form (create / edit)
                        closeNoteFormModel={closeNoteFormModel} // close note form (create / edit)
                        isEditing={isEditing} // editing status (edit)
                    />
                }

                {/* view full screen note  modal */}
                {viewNoteModal &&
                    <div className="ViewFullNote" onClick={() => closeViewModal()}>
                        <ViewFullNote
                            fullViewNoteId={fullViewNoteId} // id of note 
                            closeViewModal={closeViewModal} // modal close function
                            markImportant={markImportant} // mark important functon
                            openNoteFormEdit={openNoteFormEdit} // open edit form function
                            moveOneNoteToBin={moveOneNoteToBin} // soft delete note function
                        />
                    </div>
                }

                {/* modal to edit note */}

                {/* secondary nav */}
                <SecondaryNav title="All Notes" count={notes.length} openNoteFormCreate={openNoteFormCreate} />

                {/* displaying notes */}
                {notes.length === 0 ?

                    <p className="no_notes">ADD YOUR NOTES AND TASKS</p>

                    :

                    (<div className="notes_display_sec">

                        {/* note card */}
                        {notes && notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note} // each note data
                                viewFullNote={viewFullNote} // to open note full pre view
                                markImportant={markImportant} // to mark note important
                                openNoteFormEdit={openNoteFormEdit} // to open note form for editing
                                moveOneNoteToBin={moveOneNoteToBin} // to soft delete note
                            />
                        ))}

                    </div>)

                }

            </div>

        </>
    )
}

export default AllNotes