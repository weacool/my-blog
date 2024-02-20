import { useState, useEffect } from "react";
import "./interface.tsx";
import "./index.css";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import supabase from "./supabase.tsx";

const BlogApp = () => {
  const [blogData, setState] = useState<blogData[]>([
    { id: 0, title: "", content: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("blog").select("*");

      if (error) {
        console.error("Error fetching data:", error.message);
        return;
      }
      console.log(data);
      setState(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <Typography variant="h4" sx={{ marginTop: "40px" }}>
        Blog Posts
      </Typography>
      <ul>
        {blogData.map((blog) => (
          <List key={blog.id}>
            <div>
              <Typography
                component="div"
                variant="body1"
                sx={{ width: "650px" }}
              >
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
