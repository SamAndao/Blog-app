import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCheckUsernameMutation, useRegisterMutation } from "../api/apiSlice";
import { useDispatch } from "react-redux";
import { setToken, setCredentials } from "./authSlice";
import { setHidden, setSuccess } from "../notification/notificationSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkUsername] = useCheckUsernameMutation();
  const [register] = useRegisterMutation();

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [usernameStatus, setUsernameStatus] = useState({
    color: null,
    message: null,
    valid: null,
  });
  const [passwordStatus, setPasswordStatus] = useState({
    color: null,
    message: null,
    valid: null,
  });
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState({
    color: null,
    message: null,
    valid: null,
  });
  const [emailStatus, setEmailStatus] = useState({
    color: null,
    message: null,
    valid: null,
  });

  const typingTimer = useRef(null);

  useEffect(() => {
    setUsernameStatus({
      valid: false,
    });
    clearTimeout(typingTimer.current);
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (usernameInput === "") {
      return;
    }
    if (usernameInput.length < 3) {
      return setUsernameStatus({
        valid: false,
        color: "red",
        message: "Username must be atleast 3 chracters",
      });
    }
    if (!usernamePattern.test(usernameInput)) {
      return setUsernameStatus({
        valid: false,
        color: "red",
        message: "Only letters and numbers with no spaces",
      });
    }
    typingTimer.current = setTimeout(async () => {
      const { data } = await checkUsername(usernameInput);
      if (!data.available) {
        return setUsernameStatus({
          valid: false,
          color: "red",
          message: "Username already taken",
        });
      }
      return setUsernameStatus({
        valid: true,
        color: "green",
        message: "Valid username",
      });
    }, 1000);
  }, [usernameInput, checkUsername]);

  useEffect(() => {
    if (password === "") {
      return setPasswordStatus({
        valid: false,
      });
    }
    if (password.length < 6) {
      return setPasswordStatus({
        valid: false,
        color: "red",
        message: "Password must be atleast 6 characters",
      });
    }
    setPasswordStatus({
      valid: true,
      color: "green",
      message: "Valid password",
    });
  }, [password]);

  useEffect(() => {
    if (confirmPassword === "") {
      return setConfirmPasswordStatus({
        valid: false,
      });
    }
    if (password !== confirmPassword) {
      return setConfirmPasswordStatus({
        valid: false,
        color: "red",
        message: "Password must match the password given above",
      });
    }
    setConfirmPasswordStatus({
      valid: true,
      color: "green",
      message: "Valid password",
    });
  }, [confirmPassword, password]);

  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email === "") {
      return setEmailStatus({
        valid: true,
        color: "green",
        message: "Valid email",
      });
    }
    if (!emailPattern.test(email)) {
      return setEmailStatus({
        valid: false,
        color: "red",
        message: "Must be a valid email",
      });
    }
    setEmailStatus({
      valid: true,
      color: "green",
      message: "Valid email",
    });
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      usernameStatus.valid &&
      passwordStatus.valid &&
      confirmPasswordStatus.valid &&
      emailStatus.valid
    ) {
      try {
        const { accessToken, username, userId } = await register({
          password,
          email,
          username: usernameInput,
        }).unwrap();

        // eslint-disable-next-line
        const closeNotification = setTimeout(() => {
          dispatch(setHidden());
        }, 5000);

        dispatch(
          setSuccess({ message: `Register success. Welcome ${username}!` })
        );
        dispatch(setToken({ accessToken }));
        dispatch(setCredentials({ username, userId }));
        setMessage("");
        navigate("/");
      } catch (err) {
        setMessage("Register failed");
      }
    } else {
      setMessage("Please fill out all fields correctly");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form className="register__form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username-input">Username:</label>
        <input
          placeholder="Username"
          id="username-input"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          autoComplete="off"
          title="Username must contain at least 3 letters or numbers with no spaces"
        ></input>

        <h4 className={`register__form-input--status ${usernameStatus.color}`}>
          {usernameStatus.message}
        </h4>
        <label htmlFor="password-input">Password:</label>
        <input
          placeholder="Password"
          type="password"
          id="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          title="Password must contain at least 6 characters"
        ></input>
        <h4 className={`register__form-input--status ${passwordStatus.color} `}>
          {passwordStatus.message}
        </h4>

        <label htmlFor="confirm-password-input">Confirm Password:</label>
        <input
          placeholder="Confirm Password"
          type="password"
          id="confirm-password-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
          title="Must match the password above"
        ></input>
        <h4
          className={`register__form-input--status ${confirmPasswordStatus.color}`}
        >
          {confirmPasswordStatus.message}
        </h4>

        <label htmlFor="email-input">Email (Optional):</label>
        <input
          placeholder="Email"
          id="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          title="Must be a valid email"
        ></input>
        <h4 className={`register__form-input--status ${emailStatus.color}`}>
          {emailStatus.message}
        </h4>

        <button type="submit" className="btn">
          Register
        </button>
      </form>
      {message ? <div className="register__message">{message}</div> : null}
    </div>
  );
};

export default Register;
