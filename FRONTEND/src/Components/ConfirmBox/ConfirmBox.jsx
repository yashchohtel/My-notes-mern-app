import React from 'react'
import "./confirmBox.css"
import { HiMiniXCircle } from "react-icons/hi2";
import { IoCheckmarkCircle } from "react-icons/io5";

const ConfirmBox = ({ closeConfirmBox, handleConfirmAction, whichPart, closeUserOption }) => {

    return (
        <>

            {/* confirm box content */}
            <div className="confirm_box_content" onClick={(e) => e.stopPropagation()}>

                {/* setting heading of confirm box according to the confirmation request */}
                {(whichPart === "noteCard" || whichPart === "fullPreview") &&
                    <p className="confirm_msg">Sure you want to delete ? </p>
                }

                {(whichPart === "secondaryNavDeleteAllNote") &&
                    <p className="confirm_msg">Sure you want to delete all notes ? </p>
                }

                {(whichPart === "secondaryNavDeleteAllImpNote") &&
                    <p className="confirm_msg">Sure you want to delete all important notes ? </p>
                }

                {(whichPart === "secondaryNavPermDelAllNote") &&
                    <p className="confirm_msg">Sure you want empty recycle bin ? </p>
                }

                {(whichPart === "secondaryNavResAll") &&
                    <p className="confirm_msg">Sure you want to restore all notes ? </p>
                }

                {(whichPart === "permDelNote") &&
                    <p className="confirm_msg">Delete notes permanentaly ? </p>
                }

                {(whichPart === "restoreNote") &&
                    <p className="confirm_msg">Rstore note ? </p>
                }

                {(whichPart === "unmark-imp") &&
                    <p className="confirm_msg">Mark all notes un-importent ? </p>
                }

                {(whichPart === "proUserToAdmin") &&
                    <p className="confirm_msg">Promote User to Admin ? </p>
                }

                {(whichPart === "proUserToSupAdmin") &&
                    <p className="confirm_msg">Promote User to Super Admin ? </p>
                }

                {(whichPart === "demAdminToUser") &&
                    <p className="confirm_msg">Demote Admin to User ? </p>
                }

                {(whichPart === "permDeleteUser") &&
                    <p className="confirm_msg">Are you very sure, want to delete user account ? </p>
                }

                <div className="buttons_div">

                    {/* delete button */}
                    <button
                        className='button_primary delete'
                        onClick={() => {
                            handleConfirmAction(true) // pass confirm action true if we want to complete action
                            closeConfirmBox() // close confirm box
                            closeUserOption() // close admin option box in admin page after yes confirm
                        }}
                    >
                        YES  <IoCheckmarkCircle />
                    </button>

                    {/* cancel button */}
                    <button
                        className='button_primary cancle'
                        onClick={() => {
                            handleConfirmAction(false) // pass confirm action false if we dont want to complete action
                            closeConfirmBox() // close confirm box
                        }}>

                        Cancel <HiMiniXCircle />
                    </button>

                </div>

            </div>
        </>
    )
}

export default ConfirmBox;