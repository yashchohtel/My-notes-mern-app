import React from 'react'
import { useLocation } from 'react-router-dom';
import './Register.css'
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import Navbar from '../../Components/Navbar/Navbar';

const Register = () => {

    // creating location object to get the state from the router
    const location = useLocation();

    // getting the type of form from the state passed from the router, default is login
    const formType = location.state?.type || 'login';

    return (
        <>

            {/* Register page main container */}

            <section className='main_form_section'>
                {/* rendering navbar */}
                <Navbar hideLoginButton={true} />

                {/* rendring form component */}
                <RegisterForm type={formType} />

            </section>

        </>
    )
}

export default Register