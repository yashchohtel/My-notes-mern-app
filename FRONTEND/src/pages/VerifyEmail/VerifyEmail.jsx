import React, { useEffect, useState } from 'react'
import './verifyEmail.css'
import Navbar from '../../Components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { sendVerificationOtp, verifyEmailOtp } from '../../features/auth/authThunks';
import { CgSpinner } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

    const location = useLocation();
    const isEnterOtp = location.pathname === "/verify-email/enter";
    const isSendOtp = location.pathname === "/verify-email/send";

    // configure useNavigate to navigate 
    const navigate = useNavigate();

    // getting required Data from global store using useSelector
    const { loading, successMessage, error, user } = useSelector((state) => state.auth);

    // descturing values from usre object
    const { isAccountVerified } = user;

    // configure dispatch use to dispatch actions
    const dispatch = useDispatch();

    // send otp -------------------------

    // state to store otp send or not
    const [isOtpSend, setIsOtpSend] = useState(false);

    // function to handle send otp button
    const sendOtp = () => {
        dispatch(sendVerificationOtp())
    }

    // enter otp -------------------------

    // to store to refrence of input fields
    const inputRefs = React.useRef([]);

    // for moving focus in next input
    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus(); //  Move to next input
        }
    }

    // for moving focus on previous input
    const handleBackSpace = (e, index) => {
        if (e.key === "Backspace" && index > 0 && e.target.value === "") {
            inputRefs.current[index - 1].focus(); //  Focus previous input
        }
    }

    // for pasteing the copyed otp
    const handlePaste = (e) => {
        const copiedText = e.clipboardData.getData("text");
        const characters = copiedText.split(""); //  Split into array

        characters.map((elm, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = elm
            }
        })

        inputRefs.current[inputRefs.current.length - 1].focus();
    }

    // submit otp -------------------------

    // handle otp submit
    const handleSubmit = (e) => {

        e.preventDefault();

        const otpArray = inputRefs.current.map(e => e.value)
        const otp = otpArray.join('')

        dispatch(verifyEmailOtp(otp))
    }

    // effect to focus on first input on load
    useEffect(() => {
        // Jab path /verify-email/enter ho aur input fields DOM pe render ho chuki ho
        if (location.pathname === "/verify-email/enter" && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [location.pathname]);

    // effect to load the inputfield after otp success
    useEffect(() => {
        if (successMessage === "OTP sent to your registered email") {
            setIsOtpSend(true);
            navigate("/verify-email/enter");
        }

    }, [successMessage]);

    // effect to redire to home page after verification
    useEffect(() => {
        if (isAccountVerified) {
            navigate("/home")
        }
    }, [user])


    return (
        <>

            {/* main container */}
            <div className="verify_email_container">

                {/* navbar component */}
                <Navbar />

                {isSendOtp ?
                    (<>

                        {/* send otp comtainer */}
                        <div className="send_otp_container">

                            {/* heading */}
                            <h3 className='otp_heading'> SEND EMAIL VERIFICATION OTP</h3>

                            {/* send otp button */}
                            <button className='button button_primary' onClick={() => sendOtp()}>
                                {loading ? (<span className='loder'> <CgSpinner size={25} /> </span>) : "SEND OTP"}
                            </button>

                            {/* send otp description */}
                            <p className='otp_description'>"Make sure your account email is valid."</p>

                        </div>

                    </>)
                    :
                    (<>

                        {/* send otp comtainer */}
                        <div className="send_otp_container">

                            {/* heading */}
                            <h3 className='otp_heading'> Email Verify OTP </h3>

                            <p className='otp_description'>Enter the 6-digit code sent to your email id.</p>

                            <form className='form' onSubmit={(e) => handleSubmit(e)}>

                                <div className="input_container">

                                    {Array(6).fill(0).map((_, index) => (
                                        <input
                                            className='otp_input'
                                            type="text" maxLength='1' key={index} required
                                            ref={e => inputRefs.current[index] = e}
                                            onInput={(e) => handleInput(e, index)}
                                            onKeyDown={(e) => handleBackSpace(e, index)}
                                            onPaste={(e) => handlePaste(e)}
                                        />
                                    ))}

                                </div>

                                {/* error message */}
                                {error && error.toLowerCase().includes("otp") && (<span className="error_message">{error}</span>)}

                                {/* send otp button */}
                                <button className='button button_primary'>
                                    {loading ? (<span className='loder'> <CgSpinner size={25} /> </span>) : "SUBMIT OTP"}
                                </button>

                                <p className="otp_description try_again">Didn’t get otp please try after 1 minute
                                    <span onClick={() => navigate("/verify-email/send")}>RESEND OTP</span>

                                </p>


                            </form>

                        </div>

                    </>)

                }

            </div>
        </>
    )
}

export default VerifyEmail