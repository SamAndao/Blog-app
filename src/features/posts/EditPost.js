import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFailed,
  setHidden,
  setSuccess,
} from "../notification/notificationSlice";
import { useGetPostQuery, useUpdatePostMutation } from "../api/apiSlice";
import { useParams } from "react-router-dom";
import Missing from "../../components/Missing";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  const {
    data: post,
    isLoading,
    isError,
    isSuccess: postSuccess,
  } = useGetPostQuery(id);
  const [updatePost, { isError: updateError }] = useUpdatePostMutation();

  const [isRendered, setIsRendered] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const [postContent, setPostContent] = useState(null);

  if (postSuccess && !isRendered) {
    setIsRendered(true);
    setPostContent(post.content);
    setPostTitle(post.title);
  }

  const handleUpdatePost = async () => {
    await updatePost({ title: postTitle, content: postContent, postId: id });
    //eslint-disable-next-line
    const closeNotification = setTimeout(() => {
      dispatch(setHidden());
    }, 5000);
    if (updateError)
      return dispatch(
        setFailed({ message: "An error has occured while updating post" })
      );
    dispatch(setSuccess({ message: "Your post has been updated" }));
    navigate(`/post/${id}`);
  };

  if (isLoading) return <h1>Loading...</h1>;
  else if (isError) return <Missing />;
  else if (userId !== post.userId) return <Missing />;
  return (
    <div className="new-post">
      <h1>Update post</h1>
      <form className="create-post-form">
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
      </form>
      <button
        className="btn delete margin-right"
        onClick={() => navigate(`/post/${id}`)}
      >
        Cancel
      </button>
      <button className="btn" onClick={() => handleUpdatePost()}>
        Update
      </button>
    </div>
  );
};

export default EditPost;
