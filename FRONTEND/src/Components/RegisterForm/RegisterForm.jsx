import React, { useState } from 'react'
import "./registerForm.css"

const RegisterForm = ({ type }) => {

    // state for storing for type login or signup comming from props
    const [formType, setFormType] = useState(type);

    // function to toggle between login and register form
    const toggleForm = () => {
        setFormType(prevType => prevType === 'login' ? 'signup' : 'login');
    }

    console.log(formType);


    return (
        <>

            {/* Main form containe */}
            <section className="">


            </section>

        </>
    )
}

export default RegisterForm