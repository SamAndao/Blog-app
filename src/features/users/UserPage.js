import React from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery, useGetUserPostsQuery } from "../api/apiSlice";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
const UserPage = () => {
  const { id } = useParams();
  const { data: posts = [], isLoading: loadingPosts } =
    useGetUserPostsQuery(id);
  const { data: user, isLoading: loadingUser } = useGetUserQuery(id);

  console.log(posts);

  const postData = useMemo(() => {
    const unsorted = posts.slice();
    return unsorted.sort((a, b) => b.date.localeCompare(a.date));
  }, [posts]);

  const PostExcerpt = ({ post }) => {
    return (
      <li className="blogItem">
        <Link to={`/Blog-app/post/${post._id}`}>
          <h1 className="blogHeading">{post.title}</h1>
        </Link>
        <span>{post.user}</span>
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

  if (loadingPosts || loadingUser) content = <h1>Loading...</h1>;
  else {
    content = (
      <div className="user-page">
        <h1 className="user-page__username">{user.username}</h1>
        <h2 className="user-page__subhead">All posts:</h2>
        <ul>
          {postData.map((post) => {
            return <PostExcerpt post={post} key={post._id} />;
          })}
        </ul>
      </div>
    );
  }
  return content;
};

export default UserPage;
