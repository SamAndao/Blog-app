import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useRefreshQuery } from "./features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setCredentials } from "./features/auth/authSlice";
import { setHidden } from "./features/notification/notificationSlice";

import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import NewPost from "./features/posts/NewPost";
import About from "./components/About";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Missing from "./components/Missing";
import PostPage from "./features/posts/PostPage";
import UserPage from "./features/users/UserPage";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Home />} />
//       <Route path="about" element={<About />} />
//       <Route path="newpost" element={<NewPost />} />
//       <Route path="postpage" element={<PostPage />} />
//       <Route path="*" element={<Missing />} />
//     </Route>
//   )
// );

function App() {
  const dispatch = useDispatch();

  const { heading, isHidden, color, message } = useSelector(
    (state) => state.notification
  );
  const { data } = useRefreshQuery();

  const firstPageLoad = useCallback(async () => {
    if (!data) return;
    const { accessToken, username, userId } = data;
    dispatch(setToken({ accessToken }));
    dispatch(setCredentials({ username, userId }));
  }, [data, dispatch]);
  useEffect(() => {
    firstPageLoad();
  }, [firstPageLoad]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Blog-app" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="new-post" element={<NewPost />} />
            <Route path="about" element={<About />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="post/:id" element={<PostPage />} />
            <Route path="user/:id" element={<UserPage />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </Router>
      <div
        className={`notification ${color} ${
          isHidden ? "notification--hidden" : null
        }`}
      >
        <h5>{heading}</h5>
        <p>{message}</p>
        <button
          className="notification__close-button"
          onClick={() => dispatch(setHidden())}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
