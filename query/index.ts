import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

import express from "express";
import { QueryServicePostMap } from "./types";

const PORT_NUMBER = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {} as QueryServicePostMap;

app.get("/posts", async (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "POST_CREATED") {
    const { id, title } = data;

    posts[id] = { ...data, comments: [] };
  }
  if (type === "COMMENT_CREATED") {
    const { id, content, postID } = data;

    posts[postID].comments.push({ id, content });
  }
  console.log(JSON.stringify(posts));
  res.status(200).send(posts);
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
