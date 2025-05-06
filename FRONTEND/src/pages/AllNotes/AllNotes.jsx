import React, { useEffect, useState } from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import "./allNotes.css";
import NoteCard from '../../Components/NoteCard/NoteCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ViewFullNote from '../../Components/ViewFullNote/ViewFullNote';
import NoteForm from '../../Components/NoteForm/NoteForm';
import ConfirmBox from '../../Components/ConfirmBox/ConfirmBox';
import useNoteAction from '../../hooks/useNoteAction';
import CardSkletenLoading from '../../Components/CardSkletenLoading/CardSkletenLoading';

const AllNotes = () => {

    // getting required Data from global store using useSelector
    const { notes, loading: notesLoading, filteredNote } = useSelector((state) => state.notes);
    const { noteViewType } = useSelector((state) => state.theme);

    console.log(filteredNote);

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
    const searchedNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>

            {/* all notes container */}
            <div className="allNotesContainer">

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

                    (<div className={`notes_display_sec ${noteViewType ? "line_view" : ""}`}>

                        {/* note card skleton loading*/}
                        {notesLoading ?

                            (
                                [...Array(6)].map((_, index) => (
                                    <CardSkletenLoading key={index} />
                                ))
                            )

                            :

                            (
                                searchedNotes.map((note) => (
                                    // note card
                                    <NoteCard
                                        key={note._id}
                                        note={note}
                                        viewFullNote={viewFullNote}
                                        markImportant={markImportant}
                                        openNoteFormEdit={openNoteFormEdit}
                                        openConfirmBox={openConfirmBox}
                                    />
                                ))
                            )

                        }

                    </div>)

                }

            </div>

        </>
    )
}

export default AllNotes