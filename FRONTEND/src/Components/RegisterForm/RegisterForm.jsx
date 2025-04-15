import React, { useState } from 'react'
import "./registerForm.css"
import { LuUser } from "react-icons/lu";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";


const RegisterForm = ({ type }) => {

    // state for storing loading state
    const [loading, setLoading] = useState(false);

    // state for storing password visibility state
    const [passwordVisible, setPasswordVisible] = useState(false);

    // state for storing for type login or signup comming from props
    const [formType, setFormType] = useState(type);

    // function to toggle between login and register form
    const toggleForm = () => {

        // toggle form type and reset form data
        setFormType(prevType => prevType === 'login' ? 'signup' : 'login')

        // reset form data to empty string
        setFormData({
            fullName: "",
            username: "",
            email: "",
            identifier: "",
            password: "",
        });

        // reset errors to empty object
        setErrors({});

    };

    // state for storing form data
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        identifier: "",
        password: "",
    });

    // function to handle form data change
    const handleInputChange = (e) => {

        // destructuring name and value from event target
        const { name, value } = e.target;

        // updating form data state with the new value
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    // state for storing errors
    const [errors, setErrors] = useState({});

    // function for validation
    const validateForm = () => {

        // variable to store errors
        const newErrors = {};

        // Full Name
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        else if (formData.fullName.length < 4 || formData.fullName.length > 20) {
            newErrors.fullName = "Full Name must be 4-20 chars";
        }

        // Username
        if (!formData.username.trim()) newErrors.username = "Username is required";
        else if (formData.username.length < 4 || formData.username.length > 20) {
            newErrors.username = "Username must be 4-20 chars";
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email format is invalid";
        }

        // Identifier
        if (formType === 'login' && !formData.identifier.trim()) newErrors.identifier = "Email or Username is required";

        // Password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formType === 'signup' && formData.password.length < 8) {
            newErrors.password = "Password must be 8+ chars";
        }

        // updating errors state with new errors
        console.log("Errors:", newErrors);
        setErrors(newErrors);
    };


    // function to handle form submit
    const handleFormSubmit = (e) => {

        // prevent default form submission
        e.preventDefault();

        validateForm();

        if (formType === "signup") {

            console.log("Signup done:", {
                fullName: formData.fullName,
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

        } else {

            // validate login fields
            console.log("Login data:", {
                identifier: formData.identifier,
                password: formData.password
            });

        }
    }

    return (
        <>

            {/* Registe and login form */}
            <div className='register_form'>

                {/* secondry descrition */}
                <h2>{formType === 'login' ? 'Login to your account' : 'Create your account'}</h2>

                {/* form container */}
                <form onSubmit={handleFormSubmit} className='form_container'>

                    {/* field for full name for signup */}
                    {formType === 'signup' && (
                        <>
                            <div className="input_group">
                                <span> < LuUser /> </span>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.fullName && (<span className="error_message">{errors.fullName}</span>)}
                        </>
                    )}

                    {/* field for unique username name for signup */}
                    {formType === 'signup' && (
                        <>
                            <div className="input_group">
                                <span> <MdOutlineDriveFileRenameOutline /> </span>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name='username'
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.username && (<span className="error_message">{errors.username}</span>)}
                        </>
                    )}

                    {/* field for full name for signup */}
                    {formType === 'signup' && (
                        <>
                            <div className="input_group">
                                <span> <MdOutlineEmail /> </span>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.email && (<span className="error_message">{errors.email}</span>)}
                        </>
                    )}

                    {/* field for identifier for login */}
                    {formType === 'login' && (
                        <>
                            <div className="input_group">
                                <span> <LuUser /> </span>
                                <input
                                    type="text"
                                    placeholder="Username Or Email"
                                    name='identifier'
                                    value={formData.identifier}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.identifier && (<span className="error_message">{errors.identifier}</span>)}
                        </>
                    )}

                    {/* password field */}
                    <div className="input_group">
                        <span> <MdOutlineLock /> </span>
                        <input type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <span onClick={() => setPasswordVisible(!passwordVisible)} className='eye_icon'>
                            {passwordVisible ? <LuEye /> : <LuEyeClosed />}
                        </span>
                    </div>
                    {errors.password && (<span className="error_message">{errors.password}</span>)}

                    {/* reset password link */}
                    {formType === 'login' && (
                        <p className='reset_password'>Forgot password ?</p>
                    )}

                    {/* submit button */}
                    <button type="submit" className='button_primary'>
                        {formType === "login" ? "Login" : "Sign Up"}
                    </button>

                    {/* form toggle button */}
                    {formType === "login" ?

                        (<p className=''>Don't have an account ?
                            <span className='toggle-link' onClick={() => toggleForm()}>signup here</span>
                        </p>)
                        :
                        (<p className=''>Already have an account ?
                            <span className='toggle-link' onClick={() => toggleForm()}>Login here</span>
                        </p>)
                    }

                </form>

            </div>

        </>
    )
}

export default RegisterForm;