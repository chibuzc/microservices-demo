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
  console.log(`getting all posts`);

  const postID: string = req.params.id;

  res.send(commentsByPostId[postID] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  console.log(`creating posts`);
  const commentId = randomBytes(4).toString("hex");

  const content: string = req.body.content;

  const postID: string = req.params.id;

  const comments = commentsByPostId[postID] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postID] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: { id: commentId, content, postID },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log(event.type);

  res.send({ status: "OK" });
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
