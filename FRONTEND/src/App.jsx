import { Route, Routes } from "react-router-dom"
import Welcome from "./pages/Welcome/Welcome"
import Register from "./pages/Register/Register"


function App() {

  return (
    <>


      <Routes>

        {/* Route for welcome page */}
        <Route path="/" element={<Welcome />} />

        {/* Route for login page */}
        <Route path="/register" element={<Register />} />


      </Routes>

    </>
  )
}

export default App
