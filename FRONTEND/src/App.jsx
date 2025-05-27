import { Route, Routes, useNavigate } from "react-router-dom"
import Welcome from "./pages/Welcome/Welcome"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authThunks";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Components/ProtectedRoute/PublicRoute";
import AllNotes from "./pages/AllNotes/AllNotes";
import ImportantNotes from "./pages/ImportentNotes/ImportantNotes";
import DeletedNotes from "./pages/DeletedNotes.jsx/DeletedNotes";
import UserAccount from "./pages/UserAccount/UserAccount";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import { fetchAllNotes } from "./features/notes/notesThunks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin/Admin";
import AdminRoute from "./Components/ProtectedRoute/AdminRoute";
import PassReset from "./pages/PassReset/PassReset";

function App() {

  // configure useNavigate to navigate 
  const navigate = useNavigate();

  // getting required Data from global store using useSelector
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { themeType } = useSelector((state) => state.theme);

  // configure dispatch use to dispatch actions
  const dispatch = useDispatch();

  // ---------------------------

  // state to store the toast position
  const [toastPosition, setToastPosition] = useState('bottom-right');

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setToastPosition('top-right');
      } else {
        setToastPosition('bottom-right');
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // load user data and auth state
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // effect to load all notes of user
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllNotes());
    }
  }, [dispatch, isAuthenticated]);

  // effect to change app theme
  useEffect(() => {

    if (themeType === "light") {
      document.body.classList.remove("light-mode")
    } else {
      document.body.classList.add("light-mode")
    }
  }, [themeType]);



  return (
    <>

      {/* to show toast notification */}
      <ToastContainer position={toastPosition} toastClassName="my_toast" autoClose={2000} theme='dark' />

      <Routes>

        {/* Route for welcome page */}
        <Route path="/" element={<PublicRoute> <Welcome /> </PublicRoute>} />

        {/* Route for login page */}
        <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>} />

        {/* Route for login page only for authenticated users*/}
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} >

          {/* Child Routes (These will render inside <Outlet /> in Home.jsx) */}
          <Route index element={<AllNotes />} />
          <Route path='important-notes' element={<ImportantNotes />} />
          <Route path='deleted-notes' element={<DeletedNotes />} />

        </Route>

        {/* Route for user account */}
        <Route path="/user-account" element={<ProtectedRoute> <UserAccount /> </ProtectedRoute>} />

        {/* Route for send verify Email */}
        <Route path="/verify-email/send" element={<ProtectedRoute> <VerifyEmail /> </ProtectedRoute>} />

        {/* Route for enter verify Email */}
        <Route path="/verify-email/enter" element={<ProtectedRoute> <VerifyEmail /> </ProtectedRoute>} />

        {/* Route for enter reset password */}
        <Route path="/change-password/send" element={<PassReset />} />
        <Route path="/change-password/change" element={<PassReset />} />

        {/* route for admin page */}
        <Route path="/admin-page" element={<AdminRoute> <Admin /> </AdminRoute>} />

      </Routes>

    </>
  )
}

export default App;
