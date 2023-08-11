import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateNewPostMutation } from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { setHidden, setSuccess } from "../notification/notificationSlice";

import { setFailed } from "../notification/notificationSlice";

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, username, userId } = useSelector((state) => state.auth);
  const [createNewPost, { isError }] = useCreateNewPostMutation();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!accessToken || !username || !userId) {
      setMessage("Please log in to create a new post");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!accessToken || !username || !userId) {
      return;
    }
    try {
      await createNewPost({ title: postTitle, content: postContent });
      // eslint-disable-next-line
      const closeNotification = setTimeout(() => {
        dispatch(setHidden());
      }, 5000);
      if (isError)
        return dispatch(
          setFailed({ message: "An error has occured while uploading" })
        );
      setPostContent("");
      setPostTitle("");
      navigate("/Blog-app");
      dispatch(setSuccess({ message: "New post has been created" }));
    } catch (err) {
      setMessage(`An error has occured: ${err}`);
    }
  };

  return (
    <div className="new-post">
      <h1>Create a new post</h1>
      <form className="create-post-form" onSubmit={(e) => handleSubmitPost(e)}>
        <label htmlFor="title-input" className="title-label">
          Title:
        </label>
        <input
          id="title-input"
          className="title-input"
          placeholder="Put your title here"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
          autoComplete="off"
        />
        <label htmlFor="post-input" className="post-label">
          Post:
        </label>
        <textarea
          id="post-input"
          className="post-input"
          placeholder="Put your blog here"
          value={postContent}
          onChange={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent the default behavior of Enter key in a textarea
              setPostContent(() => e.target.value + "\n"); // Append a newline character
            } else {
              setPostContent(e.target.value);
            }
          }}
          required
          autoComplete="off"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {message ? <div className="register__message">{message}</div> : null}
    </div>
  );
};

export default NewPost;
