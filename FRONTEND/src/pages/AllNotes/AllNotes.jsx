import React, { useEffect, useState } from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import "./allNotes.css";
import NoteCard from '../../Components/NoteCard/NoteCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createNote, fetchAllNotes, markNoteImportant, softDeleteAllNotes, softDeleteNote, updateNote } from '../../features/notes/notesThunks';
import ViewFullNote from '../../Components/ViewFullNote/ViewFullNote';
import NoteForm from '../../Components/NoteForm/NoteForm';
import ConfirmBox from '../../Components/ConfirmBox/ConfirmBox';

const AllNotes = () => {

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    /* ----------- create note ------------------------------- */

    // state to store show hide add note model status for add and edit
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

    // state for storing form data for create and edit
    const [noteFormData, setNoteFormData] = useState({
        title: "",
        description: ""
    });

    // function to handle form data change for create and edit
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

    // function to soft delete one note (move to recycle bin)
    const moveOneNoteToBin = (id) => {

        dispatch(softDeleteNote(id)).then(() => dispatch(fetchAllNotes()));

        // close note view model if note is delete from view full note
        closeViewModal();

    }

    /* ----------- soft delete all note ------------------------------- */

    // function to soft delete all note at once
    const moveAllNoteToBin = () => {

        dispatch(softDeleteAllNotes()).then(() => dispatch(fetchAllNotes()));

    }

    /* ----------- confirmation of delete ---------------------------  */

    // state to store confirm box open close status
    const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);

    // state to store note id which is to be deleted
    const [noteIdToDelete, setNoteIdToDelete] = useState(null);

    // state to store from which part the delete action performed
    const [whichPart, setWhichPart] = useState(null);

    // function to open confirm box
    const openConfirmBox = (id, part) => {

        // set confirmbox open true
        setConfirmBoxOpen(true);

        // setting the node id
        setNoteIdToDelete(id)

        // setting the which part the delete comming from
        setWhichPart(part)

    }

    // function to close confirm box
    const closeConfirmBox = () => {

        // set confirmbox open false
        setConfirmBoxOpen(false);

        // setting the note id to null if cancle confirmation
        setNoteIdToDelete(null)

        // setting which part to null if cancle confirmation
        setWhichPart(null)

    }

    // handle confirmation action
    const handleConfirmAction = (confirmAction) => {

        // request from note card (delete single note)
        if (whichPart === "noteCard" && confirmAction) {
            // deleteing single note
            moveOneNoteToBin(noteIdToDelete)
        }
        
        // request from full view (delete single note)
        if (whichPart === "fullPreview" && confirmAction) {
            // deleteing single note
            moveOneNoteToBin(noteIdToDelete)
        }

        // request from secondary nav (delete all note)
        if(whichPart === "secondaryNavDeleteAllNote" && confirmAction){
            // deletin all notes
            moveAllNoteToBin();
        }

    };

    return (
        <>

            {/* all notes container */}
            <div className="allNotesContainer">

                {/* model to add notes and edit note */}
                {showAddModel &&
                    <NoteForm
                        noteFormData={noteFormData} // note data (create)
                        handleInputChange={handleInputChange} // handle input change (create / edit)
                        submitNoteForm={submitNoteForm} // submit note form (create / edit)
                        closeNoteFormModel={closeNoteFormModel} // close note form (create / edit)
                        isEditing={isEditing} // editing status (edit)
                    />
                }

                {/* view full screen note modal */}
                {viewNoteModal &&
                    <div className="ViewFullNote" onClick={() => closeViewModal()}>
                        <ViewFullNote
                            fullViewNoteId={fullViewNoteId} // id of note 
                            closeViewModal={closeViewModal} // modal close function
                            markImportant={markImportant} // mark important functon
                            openNoteFormEdit={openNoteFormEdit} // open edit form function
                            openConfirmBox={openConfirmBox} // function to open confirm box
                        />
                    </div>
                }

                {/* confirmation box modal (to confirm execution of task) */}
                {confirmBoxOpen &&
                    <div className="ConfirmBox_container" onClick={() => closeConfirmBox()}>

                        <div className="confirm_box">

                            <ConfirmBox
                                closeConfirmBox={closeConfirmBox} // function to close confirm box
                                handleConfirmAction={handleConfirmAction} // function to handle action confirmation
                                whichPart={whichPart} // confirmation box msg
                            />

                        </div>

                    </div>
                }

                {/* secondary nav */}
                <SecondaryNav
                    title="All Notes" // note title for diffrent page
                    count={notes.length} // notes length for different page
                    openNoteFormCreate={openNoteFormCreate} // open create note function
                    openConfirmBox={openConfirmBox} // function to open confirm box
                />

                {/* displaying notes */}
                {notes.length === 0 ?

                    // if no note to display
                    <p className="no_notes">ADD YOUR NOTES AND TASKS</p>

                    :

                    (<div className="notes_display_sec">

                        {/* note card */}
                        {notes && notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note} // each note data
                                viewFullNote={viewFullNote} // function to open note full pre view
                                markImportant={markImportant} // function to mark note important
                                openNoteFormEdit={openNoteFormEdit} // function to open note form for editing
                                openConfirmBox={openConfirmBox} // function to open confirm box
                            />
                        ))}

                    </div>)

                }

            </div>

        </>
    )
}

export default AllNotes