import axios from "axios";
import React, { useState, useEffect } from "react";

const CommentList = ({ postId }) => {
  const [content, setContent] = useState([]);

  const fetchContents = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setContent(res.data);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  console.log(content);

  const renderedContents = content.map((content) => {
    return <li key={content.id}>{content.content}</li>;
  });

  return <ul>{renderedContents}</ul>;
};

export default CommentList;
