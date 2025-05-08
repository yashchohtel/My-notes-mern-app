import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNote, deleteAllNotesPermanently, deleteNotePermanently, fetchAllDeletedNotes, fetchAllNotes, markNoteImportant, markNoteUnimportant, restoreAllSoftDeletedNotes, restoreSoftDeletedNote, softDeleteAllImportantNotes, softDeleteAllNotes, softDeleteNote, updateNote } from "../features/notes/notesThunks";


// useNoteAction custoom hook to reuse functionality
const useNoteAction = () => {

    // initilize use dispatch 
    const dispatch = useDispatch();

    // initilize use navigate
    const navigate = useNavigate();

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    /* -------- 1. CREATE & EDIT NOTE RELATED FUNCTIONS ---------------- */

    // state to store show hide note form model status for add and edit
    const [showFormModel, setShowFormModel] = useState(false)

    // state for storing form data for create and edit
    const [noteFormData, setNoteFormData] = useState({
        title: "",
        description: ""
    });

    // state to store editing status
    const [isEditing, setIsEditing] = useState(false);

    // state to store note id to edit
    const [editNoteId, setEditNoteId] = useState(null);

    // function to open note form to create note
    const openNoteFormCreate = () => {

        // open note form for create note
        setShowFormModel(true)
    }

    // function to close model for create and edit 
    const closeNoteFormModel = () => {

        setShowFormModel(false) // close model
        setIsEditing(false) // close editing

        // reset form data
        setNoteFormData({ title: "", description: "" })

    }

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

            // navigate to home page
            navigate("/home")

        } else {

            // dispatch updateNote action
            dispatch(updateNote({ editNoteId, noteFormData })).then(() => dispatch(fetchAllNotes()))

            // show note full preview after edit
            viewFullNote(editNoteId);

        }

        // close form after submit
        closeNoteFormModel();

    }

    // function to open note form to edit note
    const openNoteFormEdit = (id) => {

        // show modal
        setShowFormModel(true)

        // set editing status true
        setIsEditing(true)

        // set id of note to edit
        setEditNoteId(id)

        // close view mode if edit button click on view full note
        closeViewModal()

        // getting note via id to edit 
        const noteToEdit = notes.find((note) => note._id === id);

        setNoteFormData({
            title: noteToEdit?.title,
            description: noteToEdit?.description,
        })

    }

    /* -------- 2. NOTE FULL SCREEN PREVIEW ---------------------- */

    // state to store viewNote modal open and close 
    const [viewNoteModal, setViewNoteModal] = useState(false);

    // state to store note data for full screen view
    const [fullViewNoteId, setFullViewNoteId] = useState(null);

    // function to view note on full screen
    const viewFullNote = (id) => {

        // send note id to fetch latest data in viewFullNote component
        if (id) {
            setFullViewNoteId(id);
            setViewNoteModal(true)
        }
    }

    // function to close full screen popup
    const closeViewModal = () => {
        setViewNoteModal(false)
        setFullViewNoteId(null)
    }

    /* -------- 3. MARK NOTE IMPORTANT  ---------------------- */

    // function to mark unmark note as important
    const markImportant = (id) => {
        dispatch(markNoteImportant(id)).then(() => dispatch(fetchAllNotes()))
    }

    /* -------- 4. SOFT DELET ONE NOTE ------------------------------- */

    // function to soft delete one note (move to recycle bin)
    const moveOneNoteToBin = (id) => {

        dispatch(softDeleteNote(id)).then(() => dispatch(fetchAllNotes()));

        // close note view model if note is delete from view full note
        closeViewModal();

    }

    /* -------- 5. SOFT DELETE ALL NOTES ------------------------------- */

    // function to soft delete all note at once
    const moveAllNoteToBin = () => {

        dispatch(softDeleteAllNotes()).then(() => dispatch(fetchAllNotes()));

    }

    // function to soft delete all important notes at once
    const moveAllImpNoteToBin = () => {

        dispatch(softDeleteAllImportantNotes()).then(() => dispatch(fetchAllNotes()));

    }

    /* -------- 6. CONFIRMATION ON ACTIONS ---------------------------  */

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

        // setting the note id
        setNoteIdToDelete(id)

        // setting the which part the delete request comming from
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

        // request from note card and note full preview (delete single note)
        if ((whichPart === "noteCard" || whichPart === "fullPreview") && confirmAction) {
            moveOneNoteToBin(noteIdToDelete);
        }

        // request from secondary nav (delete all note)
        if (whichPart === "secondaryNavDeleteAllNote" && confirmAction) {
            // deletin all notes
            moveAllNoteToBin();
        }

        // reqest from important note (delete all important note)
        if (whichPart === "secondaryNavDeleteAllImpNote" && confirmAction) {
            // delete all importent notes 
            moveAllImpNoteToBin();
        }

        if (whichPart === "secondaryNavResAll" && confirmAction) {
            dispatch(restoreAllSoftDeletedNotes()).then(() => dispatch(fetchAllNotes()));
        }

        if (whichPart === "secondaryNavPermDelAllNote" && confirmAction) {
            dispatch(deleteAllNotesPermanently()).then(() => dispatch(fetchAllNotes()));
            console.log("deleted permanentaly");
        }

        if (whichPart === "permDelNote" && confirmAction) {
            dispatch(deleteNotePermanently(noteIdToDelete)).then(() => dispatch(fetchAllNotes()));
            console.log("deleted permanentaly");
        }

        if (whichPart === "restoreNote" && confirmAction) {
            dispatch(restoreSoftDeletedNote(noteIdToDelete)).then(() => dispatch(fetchAllNotes()));
        }
        
        if (whichPart === "unmark-imp" && confirmAction) {
            dispatch(markNoteUnimportant()).then(() => dispatch(fetchAllNotes()));
        }

    };

    // return all actions
    return {

        // related to create and edit
        showFormModel,
        noteFormData,
        isEditing,
        openNoteFormCreate,
        closeNoteFormModel,
        handleInputChange,
        submitNoteForm,
        openNoteFormEdit,

        // related to full screen note preview
        viewNoteModal,
        fullViewNoteId,
        viewFullNote,
        closeViewModal,

        // related to mark note important
        markImportant,

        // related to soft delte one note
        moveOneNoteToBin,

        // related to soft delete all notes
        moveAllNoteToBin,

        // related to confirmation actions
        confirmBoxOpen,
        whichPart,
        openConfirmBox,
        closeConfirmBox,
        handleConfirmAction,
    }

}

export default useNoteAction;