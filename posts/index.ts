import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import express from "express";

import { Post } from "./types";

const PORT_NUMBER = 4000;

const app = express();
app.use(bodyParser.json());

const posts: Post = {};

app.get("/posts", (req, res) => {
  console.log(`getting all posts`);
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  console.log(`creating posts`);
  const id = randomBytes(4).toString("hex");

  const title: string = req.body.title;

  console.log(req.body);

  posts[id] = { id, title };

  console.log(id);

  res.send(posts[id]);
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
