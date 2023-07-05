import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import RootLayout from "./RootLayout";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

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
  const [blogData, setBlogData] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      datePosted: "July 1, 2023",
      timePosted: "2:30 PM",
      blogText:
        "In this blog post, we will explore the basics of React and how to get started with building web applications using React. We'll cover topics such as setting up a development environment, creating components, managing state, and handling events. By the end of this post, you'll have a solid foundation to start building your own React applications.",
    },
    {
      id: 2,
      title: "Introduction to Machine Learning",
      datePosted: "May 28, 2023",
      timePosted: "10:15 AM",
      blogText:
        "In this blog post, we will introduce the fundamental concepts of machine learning and discuss its applications in various fields. We'll explore topics such as supervised learning, unsupervised learning, and reinforcement learning. You'll gain insights into how machine learning algorithms work and learn about popular libraries and frameworks used in the field.",
    },
    {
      id: 3,
      title: "JavaScript Best Practices",
      datePosted: "May 22, 2023",
      timePosted: "4:45 PM",
      blogText:
        "Learn about the best practices to follow when writing JavaScript code to ensure clean, maintainable, and efficient applications. We'll cover topics such as variable naming conventions, code organization, error handling, and performance optimization. By following these best practices, you can improve the quality of your JavaScript code and enhance the overall development process.",
    },
    {
      id: 4,
      title: "Python Tips and Tricks",
      datePosted: "May 18, 2023",
      timePosted: "9:00 AM",
      blogText:
        "Discover useful tips and tricks to improve your Python programming skills and write more concise and effective code. We'll explore advanced features of the Python language, such as list comprehensions, lambda functions, decorators, and generators. These tips and tricks will help you become a more proficient Python developer and increase your productivity.",
    },
    {
      id: 5,
      title: "HTML and CSS Fundamentals",
      datePosted: "May 12, 2023",
      timePosted: "2:00 PM",
      blogText:
        "Master the foundational concepts of HTML and CSS to build beautiful and responsive web pages. We'll cover HTML tags, CSS selectors, box model, layout techniques, and media queries. By understanding these fundamentals, you'll be able to create stunning web designs and ensure a seamless user experience across different devices.",
    },
    {
      id: 6,
      title: "Database Design Principles",
      datePosted: "May 8, 2023",
      timePosted: "11:30 AM",
      blogText:
        "Learn about the principles and best practices for designing efficient and scalable databases. We'll discuss data modeling, normalization, indexing, query optimization, and data integrity. Understanding these principles will enable you to design robust and performant database systems that can handle large amounts of data and support complex business requirements.",
    },
  ]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {}, [search]);

  const handleSubmitPost = (e) => {
    e.preventDefault();

    const date = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const newBlogPost = {
      id: blogData.length > 0 ? blogData[blogData.length - 1].id + 1 : 1,
      title: postTitle,
      datePosted: formattedDate,
      timePosted: formattedTime,
      blogText: postContent,
    };
    setBlogData([newBlogPost, ...blogData]);
    setPostContent("");
    setPostTitle("");
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/Blog-app"
            element={<RootLayout search={search} setSearch={setSearch} />}
          >
            <Route
              index
              element={
                <Home
                  blogData={blogData.filter(
                    (data) =>
                      data.title
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      data.blogText
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )}
                />
              }
            />
            <Route path="about" element={<About />} />
            <Route
              path="newpost"
              element={
                <NewPost
                  handleSubmitPost={handleSubmitPost}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postContent={postContent}
                  setPostContent={setPostContent}
                />
              }
            />
            <Route path="posts" element={<PostPage />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
