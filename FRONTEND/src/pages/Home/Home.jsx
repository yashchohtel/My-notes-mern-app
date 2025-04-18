import React, { useEffect } from 'react'
import './Home.css';
import { clearMessages } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const Home = () => {

  // configure useNavigate to navigate 
  const navigate = useNavigate();

  // getting required Data from global store using useSelector
  const { isAuthenticated } = useSelector((state) => state.auth);

  // configure dispatch use to dispatch actions
  const dispatch = useDispatch();


  useEffect(() => {

    // clearing the messages to store next messages
    if (isAuthenticated) {

      const timer = setTimeout(() => {
        console.log("clearing messages");
        dispatch(clearMessages());
      }, 3000);

      return () => clearTimeout(timer);

    }

  }, [isAuthenticated, dispatch]);

  return (
    <>
      <section className='home_section_container'>

        {/* navbar Component */}
        <Navbar />

        {/* home notes section (all notes, important notes, deleted notes) */}
        <div className='home_notes_section_container'>
          <h1>Home</h1>
          <p>All notes</p>
          <p>Important notes</p>
          <p>Deleted notes</p>
        </div>

      </section>
    </>
  )
}

export default Home;