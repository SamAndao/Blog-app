import React, { useState } from "react";
import Missing from "../../components/Missing";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostQuery } from "../api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useDeletePostMutation } from "../api/apiSlice";
import {
  setFailed,
  setHidden,
  setSuccess,
} from "../notification/notificationSlice";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isSuccess, isLoading } = useGetPostQuery(id);
  const { userId } = useSelector((state) => state.auth);
  const [deletePost, { isError }] = useDeletePostMutation();

  const [deleteClass, setDeleteClass] = useState("confirmation--hidden");

  let content;

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      // eslint-disable-next-line
      const closeNotification = setTimeout(() => {
        dispatch(setHidden());
      }, 5000);

      if (isError)
        return dispatch(
          setFailed({ message: "An error has occured while deleting" })
        );

      dispatch(setSuccess({ message: "Post has been deleted" }));
      navigate("/");
    } catch (error) {
      console.log("An error has occured");
    }
  };

  const handleEdit = async () => {
    navigate(`/edit-post/${id}`);
  };

  if (isSuccess) {
    content = (
      <>
        <h1 className="postHeading">{post.title}</h1>
        <h3 className="postUser">{post.user}</h3>
        <h2>
          <span className="blogDate">
            {new Date(post.date).toLocaleDateString()} |{" "}
          </span>
          <span className="blogTime">
            {new Date(post.date).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </h2>
        {post.content.split("\n").map((text) => (
          <p className="postText" key={crypto.randomUUID()}>
            {text}
          </p>
        ))}
        {userId === post.userId ? (
          <div className="button-container">
            <button className=" btn edit" onClick={() => handleEdit()}>
              Edit
            </button>
            <button className="btn delete" onClick={() => setDeleteClass(null)}>
              Delete
            </button>
          </div>
        ) : null}
        <div className={`confirmation ${deleteClass}`}>
          <div className="confirmation--inner">
            <h3>Are you sure to delete?</h3>
            <button
              className="btn btn-cancel"
              onClick={() => setDeleteClass("confirmation--hidden")}
            >
              Cancel
            </button>
            <button className="btn btn-delete" onClick={() => handleDelete()}>
              Delete
            </button>
          </div>
        </div>
      </>
    );
  } else if (isLoading) content = <h1>Loading...</h1>;
  else content = <Missing />;

  return <div className="postContainer">{content}</div>;
};

export default PostPage;
