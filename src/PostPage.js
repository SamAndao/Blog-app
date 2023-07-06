import React from "react";
import { useParams } from "react-router-dom";
import Missing from "./Missing";
const PostPage = ({ blogData }) => {
  const { id } = useParams();
  const blog = blogData.find((item) => item.id === Number(id));

  return (
    <div className="postContainer">
      {blog ? (
        <>
          <h1 className="postHeading">{blog.title}</h1>
          <h2>
            <span className="postDate">{blog.datePosted} | </span>
            <span className="postTime">{blog.timePosted}</span>
          </h2>
          {blog.blogText.split("\n").map((text) => (
            <p className="postText" key={crypto.randomUUID()}>
              {text}
            </p>
          ))}
        </>
      ) : (
        <Missing />
      )}
    </div>
  );
};

export default PostPage;
