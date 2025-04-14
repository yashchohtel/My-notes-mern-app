import React from 'react'
import './Welcome.css'
import Navbar from '../../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

    // configure navigator
    const navigate = useNavigate();

    // state to store form status (login or register)
    const [formStatus, setFormStatus] = React.useState('login')

    // navigate to register page
    const handleRegisterClick = () => {
        setFormStatus('register')
        navigate('/register')
    }

    return (
        <>
            {/* Welcome page main container*/}
            <section className='welcomePage'>

                {/* welcome page navigation bar */}
                <Navbar />

                {/* welcome page content */}
                <div className="welcomePage__content">

                    <h1> "Capture Your Thoughts Effortlessly "</h1>

                    <img src="/pen.png" alt="png" />

                    <p>Never lose a thought again. Create, organize, and revisit your notes
                        — anytime, anywhere. Built for clarity, speed, and simplicity.
                    </p>

                    <button className="button_primary" onClick={() => navigate('/register', { state: { type: 'signup' } })} >
                        Start For Free
                    </button>

                </div>

            </section>
        </>
    )
}

export default Welcome