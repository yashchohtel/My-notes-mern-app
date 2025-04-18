import React, { useEffect } from 'react'
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

      console.log("clearing set time out");
      return () => clearTimeout(timer);

    }

  }, [isAuthenticated]);

  return (
    <div>Home</div>
  )
}

export default Home