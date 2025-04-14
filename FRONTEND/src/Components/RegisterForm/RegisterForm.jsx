import React, { useState } from 'react'
import "./registerForm.css"
import { LuUser } from "react-icons/lu";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";



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

            {/* Registe and login form */}
            <div className='register_form'>

                {/* main descrition */}
                <h2>{formType === "login" ? "login" : "sign in"}</h2>

                {/* secondry descrition */}
                <p>{formType === 'login' ? 'Login to your account' : 'Create your account'}</p>

                {/* form container */}
                <form>

                    {/* field for full name for signup */}
                    {formType === 'signup' && (
                        <div className="input_group">
                            <span> <MdOutlineDriveFileRenameOutline /> </span>
                            <input type="text" placeholder="Full Name" required />
                        </div>
                    )}

                    {/* field for unique username name for signup */}
                    {formType === 'signup' && (
                        <div className="input_group">
                            <span> <MdOutlineDriveFileRenameOutline /> </span>
                            <input type="text" placeholder="Username" required />
                        </div>
                    )}

                    {/* field for identifier for login */}
                    {formType === 'login' && (
                        <div className="input_group">
                            <span> <LuUser /> </span>
                            <input type="text" placeholder="Username Or Email" required />
                        </div>
                    )}


                    {/* field for full name for signup */}
                    {formType === 'signup' && (
                        <div className="input_group">
                            <span> <MdOutlineEmail /> </span>
                            <input type="email" placeholder="Email" required />
                        </div>
                    )}


                    <div className="input_group">
                        <span> <MdOutlineLock /> </span>
                        <input type="password" placeholder="Password" required />
                        <span> <LuEyeClosed /> </span>
                    </div>

                    <button type="submit" className='button_primary'>Sign Up</button>

                    <p className=''>Already have an account ?
                        <span onClick={() => toggleForm()}>Login here</span>
                    </p>

                </form>

            </div>

        </>
    )
}

export default RegisterForm