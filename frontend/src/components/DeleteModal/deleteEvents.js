import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/";
import { deleteTheEvent } from "../../store/events";


function DeleteEventModal({eventId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTheEvent(eventId))
    closeModal()
    history.push("/events")
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this event?</h2>

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

export default DeleteEventModal;

