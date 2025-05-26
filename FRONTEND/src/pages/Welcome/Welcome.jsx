import React from 'react'
import './Welcome.css'
import Navbar from '../../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

    // configure navigator
    const navigate = useNavigate();

    return (
        <>
            {/* Welcome page main container*/}
            <section className='welcomePage'>

                {/* welcome page navigation bar */}
                <Navbar />

                {/* welcome page content */}
                <div className="welcomePage__content">

                    <h1> <span className='quote'>"</span> Capture Your Thoughts Effortlessly <span className='quote'>"</span></h1>

                    <img src="/pen.png" alt="png" />

                    <p>Never lose a thought again. Create, organize, and revisit your notes
                        — anytime, anywhere. Built for clarity, speed, and simplicity.
                    </p>

                    <button className="button_primary" onClick={() => navigate('/register?form=signup', { state: { type: 'signup' } })} >
                        Start For Free
                    </button>

                </div>

            </section>
        </>
    )
}

export default Welcome