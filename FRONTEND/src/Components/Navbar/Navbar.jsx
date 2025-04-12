import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className="navbar">

                {/* Left - Logo area */}
                <div className="navbar__left">
                    <img src="/mainloo.png" alt="logo" />
                    <p>note nest</p>
                </div>

                {/* Right - Buttons */}
                <div className="navbar__right">
                    <button className="login-btn">Login</button>
                    <button className="mode-toggle-btn">🌙</button>
                </div>

            </nav>
        </>
    )
}

export default Navbar