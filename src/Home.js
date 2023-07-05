import React from "react";
import { NavLink } from "react-router-dom";

const Home = ({ blogData }) => {
  return (
    <ul>
      {blogData
        ? blogData.map((blog) => (
            <li className="blogItem" key={blog.id}>
              <NavLink to={`posts/${blog.id}`}>
                <h1 className="blogHeading">{blog.title}</h1>
              </NavLink>
              <h2>
                <span className="blogDate">{blog.datePosted} | </span>

                <span className="blogTime">{blog.timePosted}</span>
              </h2>
              <p className="blogText">{blog.blogText}</p>
            </li>
          ))
        : "Loading..."}
    </ul>
  );
};

export default Home;
