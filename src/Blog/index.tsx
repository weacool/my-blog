import { useState } from "react";
import "./interface.tsx";
import "./index.css";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const BlogApp = () => {
  const [blogData, setState] = useState<blogData[]>([
    { id: 0, title: "hi", content: "fgdsg" },
  ]);

  fetch("http://localhost:5000/api/blogs")
    .then((response) => {
      // Check if the request was successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response body as JSON
      return response.json();
    })
    .then((data) => {
      // Handle the data
      setState(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });

  return (
    <div className="container">
      <Typography variant="h2" sx={{ marginLeft: "250px" }}>
        Blogs
      </Typography>
      <ul>
        {blogData.map((blog) => (
          <List key={blog.id}>
            <div className="item">
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <Divider
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", margin: "10px 0" }}
              />
            </div>
          </List>
        ))}
      </ul>
    </div>
  );
};

export default BlogApp;
