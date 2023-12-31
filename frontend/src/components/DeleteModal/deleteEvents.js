import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/";
import { deleteTheEvent } from "../../store/events";
import './delete.css'


function DeleteEventModal({eventId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(deleteTheEvent(eventId))
    .then(() =>history.push("/events"))
    closeModal()
    // history.push("/events")
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this event?</h2>

      <button
        className="modaldeletebutton"
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

export default DeleteEventModal;

