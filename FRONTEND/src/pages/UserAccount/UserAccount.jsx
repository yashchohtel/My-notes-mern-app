import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./userAccount.css"
import { FaUserTie } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdModeEdit } from "react-icons/md";

const UserAccount = () => {

    // getting required Data from global store using useSelector
    const { user: logedUser } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.notes);

    // state to show hide upload image form
    const [showImgUpload, setShowImgUpload] = useState(false);

    // open img opload form
    const openImgForm = () => {
        setShowImgUpload(true)
    }

    // open img opload form
    const closeImgForm = () => {
        setShowImgUpload(false)
        setImagePreview(null);
    }

    // state to store url
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            // Purane URL ko revoke karo
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }

            // Naya URL banao
            const newPreview = URL.createObjectURL(file);
            setImagePreview(newPreview);
        }
    };

    return (
        <>
            {/* user accont congainer */}
            <div className="user_acount_container">

                {/* navbar component */}
                <Navbar />

                {/* image upload form */}
                {showImgUpload &&
                    <div className="upload_image" onClick={() => closeImgForm()}>

                        <form onClick={(e) => e.stopPropagation()}>

                            {imagePreview &&
                                <div className="img_pre">
                                    <img src={imagePreview} alt="Preview" />
                                </div>
                            }

                            <input
                                type="file"
                                accept="image/*"
                                className="file-input"
                                onChange={handleFileChange}
                            />

                            <button type="submit" className='edit_button button_primary'>
                                Upload
                            </button>
                        </form>

                    </div>
                }


                {/* profile section */}
                <div className="userPrifile_section">

                    {/* heading */}
                    <h1 className='user_profile_heading'> your account </h1>

                    {/* user detials section */}
                    <div className="details">

                        <div className="photo_display">
                            <span className='user_icon'> <FaUserTie /> </span>

                            {/* upload button */}
                            <button className='edit_button button_primary' onClick={() => openImgForm()} > add </button>
                        </div>

                        <div className="v-rule"> </div>

                        <ul className="detail_display">

                            <li>Full Name : <span> {logedUser.fullName} </span></li>
                            <li>User Name : <span> {logedUser.username} </span></li>
                            <li>Email : <span> {logedUser.email} </span> </li>
                            <li>Account Verified : <span> {logedUser.isAccountVerified ? "Verified" : "Not Verified"} </span></li>
                            <li>TotalNotes : <span> {notes.length} </span> </li>

                        </ul>

                    </div>

                </div>

            </div>
        </>
    )
}

export default UserAccount