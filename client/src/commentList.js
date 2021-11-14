import React from "react";

const CommentList = ({ comments }) => {
  const renderedContents = comments.map((comment) => {
    let content;

    switch (comment.status) {
      case "approved":
        content = comment.content;
        break;
      case "pending":
        content = "This comment is awaiting moderation";
        break;
      case "rejected":
        content = "This comment has been rejected";
        break;
      default:
        console.log("unknown comment status");
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedContents}</ul>;
};

export default CommentList;
