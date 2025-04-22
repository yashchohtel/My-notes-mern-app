// Components/ProtectedRoute/PublicRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const PublicRoute = ({ children }) => {

    // getting required data from global store using useSelector
    const { isAuthenticated, loading, initialAuthChecked } = useSelector((state) => state.auth);

    // is user data loading show loading
    if (!initialAuthChecked) {
        return (
            <div className="loader_2_container">
                <span className='loder_2'> <CgSpinner size={75} /> </span>
            </div>
        )
    }

    // check if user is Authenticated or not
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    // if user is authenticated then return the children component
    return children;
};

export default PublicRoute;
