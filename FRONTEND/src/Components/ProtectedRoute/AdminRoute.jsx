import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";


const AdminRoute = ({ children }) => {

    // getting required data from global store using useSelector
    const { isAuthenticated, initialAuthChecked, user } = useSelector((state) => state.auth);

    // is user data loading show loading
    if (!initialAuthChecked) {
        return (
            <div className="loader_2_container">
                <span className='loder_2'> <CgSpinner size={75} /> </span>
            </div>
        )
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If authenticated but not admin, redirect to home
    if (!user?.role?.includes("admin")) {
        return <Navigate to="/home" replace />;
    }

    // if user is authenticated then return the children component
    return children;

}

export default AdminRoute;