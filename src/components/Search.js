import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  useSearchPostsQuery,
  useSearchUsersQuery,
} from "../features/api/apiSlice";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchValue = [...searchParams][0][1];

  const {
    data: users = [],
    isSuccess: usersSuccess,
    isLoading: usersLoading,
  } = useSearchUsersQuery(searchValue);
  const {
    data: posts = [],
    isSuccess: postsSuccess,
    isLoading: postsLoading,
  } = useSearchPostsQuery(searchValue);

  let content;

  const PostExcerpt = ({ post }) => {
    return (
      <li className="blogItem">
        <Link to={`/Blog-app/post/${post._id}`}>
          <h1 className="blogHeading">{post.title}</h1>
        </Link>
        <Link to={`/Blog-app/user/${post.userId}`}>
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

  const UserExcerpt = ({ user }) => {
    return (
      <li className="users-item">
        <Link to={`/Blog-app/user/${user._id}`}>
          <h3>{user.username}</h3>
        </Link>
      </li>
    );
  };

  if (postsLoading || usersLoading) content = <h1>Loading...</h1>;
  else if (usersSuccess && postsSuccess) {
    content = (
      <>
        <h3>Found users:</h3>
        {users.length ? (
          <ul className="users-list">
            {users.map((user) => {
              return <UserExcerpt user={user} key={user._id} />;
            })}
          </ul>
        ) : (
          <p className="noUsers">No Users found</p>
        )}
        <h3>Found posts:</h3>
        {posts.length ? (
          <ul>
            {posts.map((post) => {
              return <PostExcerpt post={post} key={post._id} />;
            })}
          </ul>
        ) : (
          <p>No posts found</p>
        )}
      </>
    );
  }

  return (
    <div className="search">
      <h1>Search Results</h1>
      {content}
    </div>
  );
};

export default Search;
