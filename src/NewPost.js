import React from "react";

const NewPost = ({
  handleSubmitPost,
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
}) => {
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
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPost;
