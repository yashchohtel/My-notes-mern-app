import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useNoteAction from "./useNoteAction";
import { deleteUserAccount, demoteAdminToUser, loadAllUsers, promoteUserToAdmin, promoteUserToSuperAdmin } from "../features/admin/adminThunks";



const useAdminAction = () => {


    // initilize use dispatch 
    const dispatch = useDispatch();

    // initilize use navigate
    const navigate = useNavigate();

    // getting required Data from global store using useSelector
    const { notes } = useSelector((state) => state.notes);

    // getting all required state and actions functions to perform actions
    const {

        // related to confirmation actions
        confirmBoxOpen,
        whichPart,
        idToActOn,
        openConfirmBox,
        closeConfirmBox,

    } = useNoteAction();

    // handle confirmation action
    const handleConfirmAction = (confirmAction) => {

        // request from admin to promote user to Admin
        if (whichPart === "proUserToAdmin" && confirmAction) {
            dispatch(promoteUserToAdmin(idToActOn)).then(() => dispatch(loadAllUsers()));
        }

        // request from admin to promote user to super admin
        if (whichPart === 'proUserToSupAdmin' && confirmAction) {
            dispatch(promoteUserToSuperAdmin(idToActOn)).then(() => dispatch(loadAllUsers()));
        }

        // request from admin to demote admin to user
        if (whichPart === 'demAdminToUser' && confirmAction) {
            dispatch(demoteAdminToUser(idToActOn)).then(() => dispatch(loadAllUsers()));
        }

        // request from admin to demote admin to user
        if (whichPart === 'permDeleteUser' && confirmAction) {
            dispatch(deleteUserAccount(idToActOn)).then(() => dispatch(loadAllUsers()));
        }

    };

    // return all actions
    return {
        confirmBoxOpen,
        whichPart,
        openConfirmBox,
        closeConfirmBox,
        handleConfirmAction,
    }

}

export default useAdminAction;