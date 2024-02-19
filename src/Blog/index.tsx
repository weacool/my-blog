import { useState } from "react";
import "./interface.tsx";
import "./index.css";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const BlogApp = () => {
  const [blogData, setState] = useState<blogData[]>([
    { id: 0, title: "", content: "" },
  ]);

  fetch("http://localhost:5001/api/blogs")
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
      <Typography variant="h4" sx={{ marginTop: "40px" }}>
        Blog Posts
      </Typography>
      <ul>
        {blogData.map((blog) => (
          <List key={blog.id}>
            <div>
              <Typography variant="body1">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
              </Typography>
              <Divider
                sx={{
                  backgroundColor: "rgba(77, 119, 236, 0.6)",
                  margin: "30px 0",
                }}
              />
            </div>
          </List>
        ))}
      </ul>
    </div>
  );
};

export default BlogApp;
