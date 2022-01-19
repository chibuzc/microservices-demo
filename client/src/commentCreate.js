import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post(
      `http://post.com/posts/${postId}/comments`,
      { content }
    );

    console.log(res.data);
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> Comment </label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary"> Submit </button>
      </form>
    </div>
  );
};

export default CommentCreate;
