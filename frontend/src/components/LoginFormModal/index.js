import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = () => {
    setCredential("Queen");
    setPassword("password");
  };

  const handleLogin = (e) =>{
    closeModal();
  }

  return (
    <>
    <section className="loginmodal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <section className="loginmodal2">
      {errors.credential && (
          <p className="errors">{errors.credential}</p>
        )}
        <div id="one">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div id="one">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="loginbutton" disabled={password.length < 6 || credential.length < 4}/*</form>onClick={handleLogin}*/ type="submit">Log In</button>
        <div></div>
        <button type="submit" onClick={handleDemoLogin}> Log in as Demo User </button>
        
        </section>
      </form>
      </section>
    </>
  );
}

export default LoginFormModal;

