import React, { useEffect } from 'react'
import './Home.css';
import { clearMessages } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
        <div className="home_section_content">
          <h1>Welcome to the Home Page</h1>
          <p>This is a simple home page.</p>
        </div>
      </section>
    </>
  )
}

export default Home