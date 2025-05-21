import React from 'react'
import './passReset.css'
import Navbar from '../../Components/Navbar/Navbar'
import { MdOutlineEmail } from 'react-icons/md'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { resetPassword, sendPasswordResetOtp } from '../../features/auth/authThunks'
import { clearMessages } from '../../features/auth/authSlice'

const PassReset = () => {

    // initiilzing use location
    const location = useLocation();
    const isPassEnterOtp = location.pathname === "/change-password/change";
    const isPassSendOtp = location.pathname === "/change-password/send";

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // configure useNavigate to navigate 
    const navigate = useNavigate();

    // getting required Data from global store using useSelector
    const { loading, successMessage, isAuthenticated } = useSelector((state) => state.auth);

    // state for storing form data
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
    });

    console.log(formData.email);
    console.log(formData.otp);
    console.log(formData.newPassword);

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

    // function to handle send otp button
    const sendOtp = (e) => {

        // prevenitng default 
        e.preventDefault();

        dispatch(sendPasswordResetOtp(formData))
    }
    
    // functino to submti reset pass
    const handleResetPassword = (e) => {
        
        // prevenitng default 
        e.preventDefault();

        dispatch(resetPassword(formData))

    }

    // effect to load the inputfield after otp success
    useEffect(() => {

        if (successMessage === "OTP sent to your registered email") {
            navigate("/change-password/change");
        }

        if(isAuthenticated && successMessage === "Password reset successful."){
            navigate("/user-account");
            dispatch(clearMessages())
        }

        if(!isAuthenticated && successMessage === "Password reset successful."){
            navigate("/register?form=login");
            dispatch(clearMessages())
        }

    }, [successMessage]);

    return (
        <>
            {/* pass reset page main container */}

            <section className='pass_res_section'>

                {/* rendering navbar */}
                <Navbar />

                {isPassSendOtp ?

                    <form className='send_otp_container' onSubmit={(e) => sendOtp(e)}>

                        <h3 className="otp_heading"> SEND PASSWORD RESET OTP</h3>

                        <div className="input_group">
                            <span> <MdOutlineEmail /> </span>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name='email'
                                autoComplete="off"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <button className="button button_primary">
                            {loading ? (<span className='loder'> <CgSpinner size={25} /> </span>) : "send otp"}
                        </button>

                        <p className="otp_description">"Enter registered email to get OTP."</p>

                    </form>

                    :

                    <form className='send_otp_container' onSubmit={(e) => handleResetPassword(e)}>

                        <h3 className="otp_heading">CHANGE PASSWORD</h3>

                        <div className="input_group">
                            <span> <MdOutlineEmail /> </span>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name='email'
                                autoComplete="off"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="input_group">
                            <span> <MdOutlineEmail /> </span>
                            <input
                                type="number"
                                placeholder="Enter otp"
                                name='otp'
                                autoComplete="off"
                                required
                                value={formData.otp}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="input_group">
                            <span> <MdOutlineEmail /> </span>
                            <input
                                type="text"
                                placeholder="Enter new 8 digit pass"
                                name='newPassword'
                                autoComplete="off"
                                required
                                value={formData.newPassword}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <button className="button button_primary">
                            {loading ? (<span className='loder'> <CgSpinner size={25} /> </span>) : "reset password"}
                        </button>

                        <p className="otp_description">"OTP expires in 10 minute"</p>

                    </form>


                }

            </section>
        </>
    )

}

export default PassReset