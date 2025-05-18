import React, { useEffect, useState } from 'react'
import './Home.css';
import { clearMessages } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import useSearch from '../../hooks/useSearch';

const Home = () => {

  // configure useNavigate to navigate 
  const navigate = useNavigate();

  // getting required Data from global store using useSelector
  const { isAuthenticated } = useSelector((state) => state.notes);

  // configure dispatch use to dispatch actions
  const dispatch = useDispatch();

  // configure useLocation to get page logation
  const location = useLocation();

  // state to store search Query getting from useSearch hook
  const {
    searchQuery,
    setSearchQuery

  } = useSearch()
  

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