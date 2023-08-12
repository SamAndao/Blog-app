import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetAllPostsQuery } from "../features/api/apiSlice";

const Home = () => {
  const { data: posts = [], isLoading, isSuccess } = useGetAllPostsQuery();

  const postData = useMemo(() => {
    const unsorted = posts.slice();
    return unsorted.sort((a, b) => b.date.localeCompare(a.date));
  }, [posts]);

  const PostExcerpt = ({ post }) => {
    return (
      <li className="blogItem">
        <Link to={`post/${post._id}`}>
          <h1 className="blogHeading">{post.title}</h1>
        </Link>
        <Link to={`user/${post.userId}`}>
          <span>{post.user}</span>
        </Link>
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
        <p className="blogText">{post.content}</p>
      </li>
    );
  };

  let content;

  if (isSuccess) {
    content = (
      <>
        <h1 className="home-heading">Home</h1>
        <ul>
          {postData.map((post) => {
            return <PostExcerpt post={post} key={post._id} />;
          })}
        </ul>
      </>
    );
  } else if (isLoading) content = <h1 key="loading">Loading...</h1>;
  else content = <h1 key="error">Eror loading data</h1>;

  return content;
};

export default Home;
