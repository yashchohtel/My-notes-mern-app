import { Route, Routes, useNavigate } from "react-router-dom"
import Welcome from "./pages/Welcome/Welcome"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authThunks";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Components/ProtectedRoute/PublicRoute";
import AllNotes from "./pages/AllNotes/AllNotes";
import ImportantNotes from "./pages/ImportentNotes/ImportantNotes";
import DeletedNotes from "./pages/DeletedNotes.jsx/DeletedNotes";


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


  return (
    <>

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

      </Routes>

    </>
  )
}

export default App;
