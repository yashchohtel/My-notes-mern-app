import React from 'react'
import "./confirmBox.css"
import { MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

const ConfirmBox = ({ closeConfirmBox, handleConfirmAction, whichPart }) => {

    return (
        <>
            <div className="confirm_box_content" onClick={(e) => e.stopPropagation()}>

                {(whichPart === "noteCard" || whichPart === "fullPreview") &&
                    <p className="confirm_msg">Sure you want to delete? </p>
                }

                {(whichPart === "secondaryNavDeleteAllNote") &&
                    <p className="confirm_msg">Sure you want to delete all notes? </p>
                }

                <div className="buttons_div">

                    <button
                        className='button_primary delete'
                        onClick={() => {
                            handleConfirmAction(true) // pass confirm action true if we want to complete action
                            closeConfirmBox() // close confirm box
                        }}>
                        Delete  <MdDelete />
                    </button>

                    <button
                        className='button_primary cancle'
                        onClick={() => {
                            handleConfirmAction(false) // pass confirm action false if we dont want to complete action
                            closeConfirmBox() // close confirm box
                        }}>

                        Cancel <MdOutlineCancel />
                    </button>

                </div>

            </div>
        </>
    )
}

export default ConfirmBox