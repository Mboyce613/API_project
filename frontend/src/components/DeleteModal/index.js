import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/";
import { deleteTheGroup } from "../../store/groups";
import './delete.css'

function DeleteModal({groupId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTheGroup(groupId))
    .then(() =>history.push("/groups"))
    closeModal()
    history.push("/groups")
  };

  return (
    <>
    <section className="deletemodal">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this group?</h2>
      <section className="modalbuttons">
      <button
        className="modaldeletebutton"
        type="confirm"
        onClick={handleSubmit}
        >Yes(Delete Group)</button>
        <button
        className="modalcancelbutton"
         type="cancel"
         onClick={closeModal}
         >No (Keep Group)</button>
         </section>
    </section>
    </>
  );
}

export default DeleteModal;

