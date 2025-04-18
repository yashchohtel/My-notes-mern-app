// Components/ProtectedRoute/PublicRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    // Jab tak auth ka check chal raha hai, tab tak loading text dikhao
    if (loading) {
        return (
            <div className="loader_2_container">
                <span className='loder_2'> <CgSpinner size={75} /> </span>
            </div>
        )
    }

    // Agar user login hai, to usko /home bhej do
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    // Agar user login nahi hai, to usko woh page dikhao
    return children;
};

export default PublicRoute;
