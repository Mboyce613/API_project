import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function DeleteModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // return dispatch(sessionActions.login({ credential, password }))
    //   .then(closeModal)
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this group?</h2>

      <button onClick={()=>{closeModal()}}>No (Keep Group)</button>
      <button onClick={()=>{closeModal()}}>Yes (Delete Group)</button>

    </>
  );
}

export default DeleteModal;

