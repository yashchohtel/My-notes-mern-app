import React, { useState } from 'react'
import "./userAccount.css"
import Navbar from '../../Components/Navbar/Navbar'
import { FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { changeFullName, changeUsername, deleteProfilePic, loadUser, softDeleteAccount, uploadProfilePic } from '../../features/auth/authThunks';
import { CgSpinner } from 'react-icons/cg';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiUser } from "react-icons/fi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { CiLock } from "react-icons/ci";

const UserAccount = () => {

    // initilize use dispatch 
    const dispatch = useDispatch();

    // getting required Data from global store using useSelector
    const { user: logedUser, loading, successMessage, error } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.notes);

    // state to show hide upload image form
    const [showImgUpload, setShowImgUpload] = useState(false);

    // state to store potoloading
    const [photoLoad, setPhotoLoad] = useState(false);

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

        // photo loading
        setPhotoLoad(true)

    };

    // function to delete image
    const deleteUserProfile = () => {
        dispatch(deleteProfilePic()).then(() => dispatch(loadUser()))

        // photo loading
        setPhotoLoad(true)

    }

    // ---------------------------------

    // edit user name and fullname
    const [showProEdit, setShowProEdit] = useState(false);

    // to store what to edit
    const [whatToEdit, setWhatToEdit] = useState(null);

    // open edit form
    const openProEdit = (whatEdit) => {
        setShowProEdit(true)
        setWhatToEdit(whatEdit)
    }

    // close edit form
    const closeProEdit = () => {
        setShowProEdit(false)
        setWhatToEdit(null)

        setFormData({
            newFullName: "",
            newUsername: "",
        })

    }

    // state for storing form data
    const [formData, setFormData] = useState({
        newFullName: "",
        newUsername: "",
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

    // submit function to edit username and full name
    const submitProfileEdit = (e) => {

        // prevenitng default 
        e.preventDefault();

        if (whatToEdit === "username") {
            dispatch(changeUsername(formData)).then(() => dispatch(loadUser()))
        }

        if (whatToEdit === "fullname") {
            dispatch(changeFullName(formData)).then(() => dispatch(loadUser()))
        }

    }

    // ---------------------------------

    // delete account
    const [showDelete, setShowDelete] = useState(false);
    const [password, setPassword] = useState("")

    const openDeletBox = () => {
        setShowDelete(true);
    }

    const closeDeletBox = () => {
        setShowDelete(false);
        setPassword("")
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value); // input ki value state me save
    };

    const handleAccountDelete = (e) => {
        // prevenitng default 
        e.preventDefault();

        dispatch(softDeleteAccount(password))

    }

    useEffect(() => {

        // tp close image upload form
        if (successMessage?.toLowerCase() === "profile photo uploaded successfully".toLowerCase()) {
            closeImgForm();
        }

        // to stop photo loading
        if (successMessage || error) {
            setPhotoLoad(false);
        }

        // to close profie edit form
        if (successMessage?.toLowerCase() === "User name updated successfully.".toLowerCase() ||
            successMessage?.toLowerCase() === "Full name updated successfully.".toLowerCase()
        ) {
            closeProEdit()
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

                {/* change user name */}
                {showProEdit &&
                    <div className="editProfileSection upload_image" onClick={() => closeProEdit()}>

                        <form className='pro_edit_form' onClick={(e) => e.stopPropagation()}>

                            <h2> {whatToEdit === "username" ? "CHANGE USER NAME" : "CHANGE FULL NAME"} </h2>

                            {whatToEdit === "username" ?

                                <div className="input_group">
                                    <span><FiUser /></span>
                                    <input
                                        placeholder="Enter new username"
                                        type="text"
                                        name='newUsername'
                                        autoComplete="off"
                                        value={formData.newUsername}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </div>
                                :
                                <div className="input_group">
                                    <span><MdDriveFileRenameOutline /></span>
                                    <input
                                        placeholder="Enter new full name"
                                        type="text"
                                        name='newFullName'
                                        autoComplete="off"
                                        value={formData.newFullName}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </div>

                            }

                            <p className='desc'>
                                {whatToEdit === "username" ?
                                    "Username must be 4-20 chars"
                                    :
                                    "Full Name must be 4-20 chars"}
                            </p>

                            {/* form submit button */}
                            <button type='submit' className='button_primary' onClick={(e) => submitProfileEdit(e)}>
                                {(loading && showProEdit) ? (<span className='loder'> <CgSpinner size={25} /> </span>) : "submit"}
                            </button>


                            {/* form clse button */}
                            <span className="close_model" onClick={() => closeProEdit()}> <IoClose /> </span>

                        </form>

                    </div>
                }

                {/* delete account form */}
                {showDelete &&
                    <div className="upload_image" onClick={() => closeDeletBox()} onSubmit={(e) => handleAccountDelete(e)}>

                        <form className='pro_edit_form' onClick={(e) => e.stopPropagation()}>

                            <h2> DELETE YOUR ACCOUNT </h2>

                            <div className="input_group">
                                <span><CiLock /></span>
                                <input
                                    placeholder="enter password"
                                    type="text"
                                    name='password'
                                    autoComplete="off"
                                    required
                                    value={password}
                                    onChange={(e) => handlePassChange(e)}
                                />
                            </div>

                            <p className='desc'> enter your password to delete </p>

                            {/* form submit button */}
                            <button type='submit' className='button_primary'>
                                {loading ? (<span className='loder'> <CgSpinner size={25} /> </span>) : "Delete Account"}
                            </button>


                            {/* form clse button */}
                            <span className="close_model" onClick={() => closeDeletBox()}> <IoClose /> </span>

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
                                {(photoLoad) ? (
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

                            <li>
                                Full Name :
                                <span> {logedUser.fullName} </span>
                                <p onClick={() => openProEdit("fullname")}>change name</p>
                            </li>
                            <li>
                                User Name :
                                <span> {logedUser.username} </span>
                                <p onClick={() => openProEdit("username")}>change user name</p>
                            </li>
                            <li>
                                Email :
                                <span> {logedUser.email} </span>
                            </li>
                            <li>
                                Account Verified :
                                <span> {logedUser.isAccountVerified ? "Verified" : "Not Verified"} </span>
                            </li>
                            <li>
                                TotalNotes :
                                <span> {notes.length} </span>
                            </li>
                            <li className='btn-grp'>
                                <NavLink to="/change-password/send" >
                                    <button className='button_primary changePass_btn'>CHANGE PASSWORD</button>
                                </NavLink>
                                <button className='button_primary changePass_btn' onClick={() => openDeletBox()}>DELETE ACCOUNT</button>
                            </li>

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

