import React from 'react'
import './Welcome.css'
import Navbar from '../../Components/Navbar/Navbar'

const Welcome = () => {
    return (
        <>
            {/* Welcome page main container*/}
            <section className='welcomePage'>

                {/* welcome page navigation bar */}
                <Navbar />

            </section>
        </>
    )
}

export default Welcome