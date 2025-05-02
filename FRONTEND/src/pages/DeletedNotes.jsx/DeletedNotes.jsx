import React, { useEffect } from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import { useDispatch, useSelector } from 'react-redux';
import useNoteAction from '../../hooks/useNoteAction';
import NoteCard from '../../Components/NoteCard/NoteCard';
import { fetchAllDeletedNotes } from '../../features/notes/notesThunks';
import ConfirmBox from '../../Components/ConfirmBox/ConfirmBox';
import NoteForm from '../../Components/NoteForm/NoteForm';

const DeletedNotes = () => {

  // getting required Data from global store using useSelector
  const { isAuthenticated } = useSelector((state) => state.auth);

  // getting required Data from global store using useSelector
  const { notes, deletedNotes } = useSelector((state) => state.notes);

  // configure dispatch use to dispatch actions
  const dispatch = useDispatch();

  // extrecting all notes which is important
  const importantNotes = notes.filter(note => note.isImportant === true);

  // getting all required state and actions functions to perform actions
  const {

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

    // related to confirmation actions
    confirmBoxOpen,
    whichPart,
    openConfirmBox,
    closeConfirmBox,
    handleConfirmAction,

  } = useNoteAction();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllDeletedNotes());
      console.log("yes fetch del note");

    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      {/* all notes container */}
      <div className="deletedNotesContainer">

        {/* model to add notes and edit note */}
        {showFormModel &&
          <NoteForm
            noteFormData={noteFormData} // note data (create)
            handleInputChange={handleInputChange} // handle input change (create / edit)
            submitNoteForm={submitNoteForm} // submit note form (create / edit)
            closeNoteFormModel={closeNoteFormModel} // close note form (create / edit)
            isEditing={isEditing} // editing status (edit)
          />
        }

        {/* secondary nav */}
        <SecondaryNav
          title="Deleted Notes"
          count={deletedNotes.length}
          openConfirmBox={openConfirmBox} // function to open confirm box
          openNoteFormCreate={openNoteFormCreate} // open create note function
        />

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

        {/* displaying notes */}
        {deletedNotes.length === 0 ?

          // if no note to display
          <p className="no_notes">
            {(deletedNotes.length === 0 && notes.length === 0) && "ADD YOUR NOTES AND TASKS"}
            {(deletedNotes.length === 0 && notes.length > 0) && "RECYCLE BIN IN EMPTY"}
          </p>

          :

          (<div className="notes_display_sec">

            {/* note card */}
            {deletedNotes && deletedNotes.map((note) => (
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

      </div></>
  )
}

export default DeletedNotes