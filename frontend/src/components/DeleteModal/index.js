import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/";
import { deleteTheGroup } from "../../store/groups";


function DeleteModal({groupId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTheGroup(groupId))
    closeModal()
    history.push("/groups")
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this group?</h2>

      <button
        type="confirm"
        onClick={handleSubmit}
        >Yes(Delete Group)</button>
        <button
         type="cancel"
         onClick={closeModal}
         >No (Keep Group)</button>

    </>
  );
}

export default DeleteModal;

