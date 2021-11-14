import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import express from "express";
import cors from "cors";
import { CommentsByPostId } from "./types";
import axios from "axios";

const PORT_NUMBER = 4001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: CommentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postID: string = req.params.id;

  res.send(commentsByPostId[postID] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const content: string = req.body.content;

  const postID: string = req.params.id;

  const comments = commentsByPostId[postID] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postID] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: { id: commentId, content, postID, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  const { type, data } = req.body;

  console.log(event.type);

  switch (type) {
    case "COMMENT_MODERATED":
      const { content, postID, id, status } = data;
      const comments = commentsByPostId[postID];

      const comment = comments.find((comment) => {
        return comment.id === id;
      });
      comment!.status = status;

      await axios.post("http://localhost:4005/events", {
        type: "COMMENT_UPDATED",
        data: { id, content, postID, status },
      });

      break;

    default:
      break;
  }

  res.send({ status: "OK" });
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
