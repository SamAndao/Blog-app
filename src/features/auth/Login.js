import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setHidden, setSuccess } from "../notification/notificationSlice";
import { useDispatch } from "react-redux";
import { setCredentials, setToken } from "./authSlice";
import { useLoginMutation } from "../api/apiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [login, { error, isError }] = useLoginMutation();

  let errorMessage = null;
  if (isError && error.data.message === "User not found") {
    errorMessage = <p>Invalid Username or Password</p>;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { accessToken, username, userId } = await login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }).unwrap();
      // eslint-disable-next-line
      const closeNotification = setTimeout(() => {
        dispatch(setHidden());
      }, 5000);

      dispatch(setSuccess({ message: `Logged in. Hello, ${username}!` }));
      dispatch(setToken({ accessToken }));
      dispatch(setCredentials({ username, userId }));

      navigate("/Blog-app");
    } catch (error) {}
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login__form" onSubmit={(e) => handleLogin(e)}>
        <label htmlFor="username-input">Username:</label>
        <input
          placeholder="Username"
          id="username-input"
          ref={usernameRef}
          autoComplete="off"
          required
        ></input>
        <label htmlFor="password-input">Password:</label>
        <input
          placeholder="Password"
          id="password-input"
          ref={passwordRef}
          autoComplete="off"
          type="password"
          required
        ></input>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      {errorMessage}
    </div>
  );
};

export default Login;
