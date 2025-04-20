import React from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'

const AllNotes = () => {

    return (
        <>

            {/* all notes container */}
            <div className="allNotesContainer">

                {/* secondary nav */}
                <SecondaryNav title="All Notes" count={10} />

            </div>

        </>
    )
}

export default AllNotes