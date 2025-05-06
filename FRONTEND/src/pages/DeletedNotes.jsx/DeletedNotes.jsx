import React, { useEffect } from 'react'
'../AllNotes/allNotes.css'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import { useDispatch, useSelector } from 'react-redux';
import useNoteAction from '../../hooks/useNoteAction';
import NoteCard from '../../Components/NoteCard/NoteCard';
import { fetchAllDeletedNotes } from '../../features/notes/notesThunks';
import ConfirmBox from '../../Components/ConfirmBox/ConfirmBox';
import NoteForm from '../../Components/NoteForm/NoteForm';
import CardSkletenLoading from '../../Components/CardSkletenLoading/CardSkletenLoading';
import { useOutletContext } from 'react-router-dom';

const DeletedNotes = () => {

  // getting required Data from global store using useSelector
  const { isAuthenticated } = useSelector((state) => state.auth);

  // getting required Data from global store using useSelector
  const { notes, deletedNotes, loading: notesLoading } = useSelector((state) => state.notes);
  const { noteViewType } = useSelector((state) => state.theme);

  // configure dispatch use to dispatch actions
  const dispatch = useDispatch();

  // getting all required state and actions functions to perform actions
  const {

    // related to create 
    showFormModel,
    noteFormData,
    openNoteFormCreate,
    closeNoteFormModel,
    handleInputChange,
    submitNoteForm,

    // related to confirmation actions
    confirmBoxOpen,
    whichPart,
    openConfirmBox,
    closeConfirmBox,
    handleConfirmAction,

  } = useNoteAction();

  // search query variable comming from home page via outlet using useOutletContent
  const { searchQuery } = useOutletContext();

  // notes filtered on the basis of searched
  const searchedNotes = deletedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // effect to fetch all deleted note
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllDeletedNotes());
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

          (<div className={`notes_display_sec ${noteViewType ? "line_view" : ""}`}>

            {/* note card */}
            {notesLoading ?
              (
                [...Array(6)].map((_, index) => (
                  <CardSkletenLoading key={index} />
                ))
              )
              :
              searchedNotes && searchedNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note} // each note data
                  openConfirmBox={openConfirmBox} // function to open confirm box
                />
              ))

            }

          </div>)

        }

      </div>
    </>
  )
}

export default DeletedNotes