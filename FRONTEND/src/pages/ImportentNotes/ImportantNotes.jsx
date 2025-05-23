import React from 'react'
import '../AllNotes/allNotes.css'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import { useLocation, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useNoteAction from '../../hooks/useNoteAction';
import NoteCard from '../../Components/NoteCard/NoteCard';
import NoteForm from '../../Components/NoteForm/NoteForm';
import ViewFullNote from '../../Components/ViewFullNote/ViewFullNote';
import ConfirmBox from '../../Components/ConfirmBox/ConfirmBox';
import CardSkletenLoading from '../../Components/CardSkletenLoading/CardSkletenLoading';

const ImportantNotes = () => {

  // getting required Data from global store using useSelector
  const { notes, loading: notesLoading } = useSelector((state) => state.notes);
  const { noteViewType } = useSelector((state) => state.theme);

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

  // search query variable comming from home page via outlet using useOutletContent
  const { searchQuery } = useOutletContext();

  // notes filtered on the basis of searched
  const searchedNotes = importantNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>

      {/* all notes container */}
      <div className="importantNotesContainer">

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
          title="Important Notes"
          count={importantNotes.length}
          openConfirmBox={openConfirmBox} // function to open confirm box
          openNoteFormCreate={openNoteFormCreate} // open create note function
        />

        {/* displaying notes */}
        {importantNotes.length === 0 ?

          // if no note to display
          <p className="no_notes">
            {(importantNotes.length === 0 && notes.length === 0) && "ADD YOUR NOTES AND TASKS"}
            {(importantNotes.length === 0 && notes.length > 0) && "NO NOTES MARKED AS IMPORTENT"}
          </p>

          :

          (<div className={`notes_display_sec ${noteViewType ? "line_view" : ""}`}>

            {/* note card skleton loading*/}
            {notesLoading ?

              (
                [...Array(6)].map((_, index) => (
                  <CardSkletenLoading key={index} />
                ))
              )

              :

              (searchedNotes && searchedNotes.map((note) => (
                // node card
                <NoteCard
                  key={note._id}
                  note={note} // each note data
                  viewFullNote={viewFullNote} // function to open note full pre view
                  markImportant={markImportant} // function to mark note important
                  openNoteFormEdit={openNoteFormEdit} // function to open note form for editing
                  openConfirmBox={openConfirmBox} // function to open confirm box
                />
              )))

            }

          </div>)

        }

      </div>

    </>
  )
}

export default ImportantNotes