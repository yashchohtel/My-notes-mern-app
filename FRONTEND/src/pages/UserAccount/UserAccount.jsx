import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./userAccount.css"
import { FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { MdModeEdit } from "react-icons/md";
import { deleteProfilePic, loadUser, uploadProfilePic } from '../../features/auth/authThunks';
import { CgSpinner } from 'react-icons/cg';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const UserAccount = () => {

    // initilize use dispatch 
    const dispatch = useDispatch();

    // getting required Data from global store using useSelector
    const { user: logedUser, loading, successMessage } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.notes);

    console.log(successMessage);

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

    // state to store file of image
    const [selectedFile, setSelectedFile] = useState(null); // actual file

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {

            // store image file
            setSelectedFile(file);

            // Purane URL ko revoke karo
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }

            // Naya URL banao
            const newPreview = URL.createObjectURL(file);
            setImagePreview(newPreview);
        }
    };

    // submit function to upload image
    const handleUpload = (e) => {

        // prevenitng default 
        e.preventDefault();

        // loading image file in form data
        const formData = new FormData();
        formData.append('profilePic', selectedFile); // your file input state

        // dispatching upload functon
        dispatch(uploadProfilePic(formData)).then(() => dispatch(loadUser()))

    };

    // function to delete image
    const deleteUserProfile = () => {
        dispatch(deleteProfilePic()).then(() => dispatch(loadUser()))
    }

    useEffect(() => {
        if (successMessage?.toLowerCase() === "profile photo uploaded successfully".toLowerCase()) {
            closeImgForm();
        }
    }, [successMessage])

    return (
        <>
            {/* user accont congainer */}
            <div className="user_acount_container">

                {/* navbar component */}
                <Navbar />

                {/* image upload form */}
                {(showImgUpload) &&
                    <div className="upload_image" onClick={() => closeImgForm()}>

                        <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleUpload(e)}>

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
                                required
                            />

                            {/* upload button  */}
                            <button type="submit" className='edit_button button_primary'>
                                {loading ? (<span className='loder'> <CgSpinner size={25} /> </span>) : "UPLOAD"}
                            </button>

                            {/* form clse button */}
                            <span class="close_model" onClick={() => closeImgForm()}> <IoClose /> </span>
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

                            {/* profile image */}
                            <span className="user_icon">
                                {loading ? (
                                    <span className='loder'> <CgSpinner size={25} /> </span>
                                ) : logedUser.profileImage ? (
                                    <img src={logedUser.profileImage} alt="image" />
                                ) : (
                                    <FaUserTie />
                                )}
                            </span>

                            {/* upload button */}
                            <button className='edit_button button_primary' onClick={() => openImgForm()} > 
                                {logedUser.profileImage ? "change" : "add"}
                            </button>


                            {/* delete button */}
                            {logedUser.profileImage &&
                                <button className='edit_button button_primary' onClick={() => deleteUserProfile()}>
                                    remove
                                </button>
                            }

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

                    {/* change email */}
                    <div className="change_email"></div>

                </div>

            </div>
        </>
    )
}

export default UserAccount