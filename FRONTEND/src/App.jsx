import { Route, Routes } from "react-router-dom"
import Welcome from "./pages/Welcome/Welcome"


function App() {

  return (
    <>


      <Routes>

        {/* Route for welcome page */}
        <Route path="/" element={<Welcome />} />

        {/* Route for login page */}
        <Route path="/login" element={<h1>Login</h1>} />


      </Routes>

    </>
  )
}

export default App
