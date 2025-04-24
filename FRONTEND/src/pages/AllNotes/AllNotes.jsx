import React from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import "./allNotes.css";
import NoteCard from '../../Components/NoteCard/NoteCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const AllNotes = () => {

    // configure useNavigate to navigate 
    const navigate = useNavigate();

    // getting required Data from global store using useSelector
    const { isAuthenticated } = useSelector((state) => state.auth);

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    return (
        <>

            {/* all notes container */}
            <div className="allNotesContainer">

                {/* secondary nav */}
                <SecondaryNav title="All Notes" count={10} />

                {/* notes display section */}
                <div className="notes_display_sec">

                    {/* note card */}
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />

                </div>

            </div>

        </>
    )
}

export default AllNotes