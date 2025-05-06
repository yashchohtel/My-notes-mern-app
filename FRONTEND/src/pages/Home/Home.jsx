import React, { useEffect, useState } from 'react'
import './Home.css';
import { clearMessages } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import AllNotes from '../AllNotes/AllNotes';
import useNoteAction from '../../hooks/useNoteAction';

const Home = () => {

  // configure useNavigate to navigate 
  const navigate = useNavigate();

  // getting required Data from global store using useSelector
  const { isAuthenticated } = useSelector((state) => state.notes);

  // configure dispatch use to dispatch actions
  const dispatch = useDispatch();

  // configure useLocation to get page logation
  const location = useLocation();

  // state to store search Query
  const [searchQuery, setSearchQuery] = useState("");

  // getting all required state and actions functions to perform actions
  const {

    // related to note display type
    noteViewType,
    changeNoteViewType

  } = useNoteAction();

  // effect to clear messages after authentication
  useEffect(() => {

    // clearing the messages to store next messages
    if (isAuthenticated) {

      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);

      return () => clearTimeout(timer);

    }

  }, [isAuthenticated, dispatch]);

  // effect to clear search bar on page change
  useEffect(() => {
    // Clear search query on every route change
    setSearchQuery("");
  }, [location.pathname]);

  return (
    <>
      <section className='home_section_container'>

        {/* navbar Component */}
        <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        noteViewType={noteViewType}
        changeNoteViewType={changeNoteViewType}
        />

        {/* home notes section (all notes, important notes, deleted notes) */}
        <div className='home_notes_section_container'>

          <Outlet context={{ searchQuery }} />

        </div>

      </section>
    </>
  )
}

export default Home;