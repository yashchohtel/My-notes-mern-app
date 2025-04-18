import { Route, Routes, useNavigate } from "react-router-dom"
import Welcome from "./pages/Welcome/Welcome"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authThunks";


function App() {

  // configure useNavigate to navigate 
  const navigate = useNavigate();

  // getting required Data from global store using useSelector
  const { isAuthenticated } = useSelector((state) => state.auth);

  // configure dispatch use to dispatch actions
  const dispatch = useDispatch();

  // load user data and auth state
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // redirect to home page if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>

      <Routes>

        {/* Route for welcome page */}
        <Route path="/" element={<Welcome />} />

        {/* Route for login page */}
        <Route path="/register" element={<Register />} />

        {/* Route for login page */}
        <Route path="/home" element={<Home />} />

      </Routes>

    </>
  )
}

export default App
