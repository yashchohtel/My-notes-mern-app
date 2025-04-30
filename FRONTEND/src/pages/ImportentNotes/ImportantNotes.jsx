import React from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ImportantNotes = () => {


  // configure useLocation
  const location = useLocation();

  // getting required Data from global store using useSelector
  const { notes } = useSelector((state) => state.notes);

  // extrecting all notes which is important
  const importantNotes = notes.filter(note => note.isImportant === true);

  console.log(importantNotes);

  return (
    <>

      {/* all notes container */}
      <div className="importantNotesContainer">

        {/* secondary nav */}
        <SecondaryNav title="Important Notes" count={importantNotes.length} />

      </div>

    </>
  )
}

export default ImportantNotes