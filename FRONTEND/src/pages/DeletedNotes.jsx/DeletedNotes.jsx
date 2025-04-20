import React from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'

const DeletedNotes = () => {
  return (
    <>
      {/* all notes container */}
      <div className="deletedNotesContainer">

        {/* secondary nav */}
        <SecondaryNav title="Deleted Notes" count={10} />

      </div></>
  )
}

export default DeletedNotes