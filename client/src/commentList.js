import React from "react";

const CommentList = ({ comments }) => {

  const renderedContents = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedContents}</ul>;
};

export default CommentList;
