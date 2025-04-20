import React from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'

const ImportantNotes = () => {

  return (
    <>

      {/* all notes container */}
      <div className="importantNotesContainer">

        {/* secondary nav */}
        <SecondaryNav title="Important Notes" count={8} />

      </div>

    </>
  )
}

export default ImportantNotes