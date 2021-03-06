import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

import express from "express";

import { Post } from "./types";
import axios from "axios";

const PORT_NUMBER = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: Post = {};

app.get("/posts", (req, res) => {
  console.log(`fetching all posts`);

  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  console.log(`creating posts`);

  const id = randomBytes(4).toString("hex");

  const title: string = req.body.title;

  console.log(req.body);

  posts[id] = { id, title };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "POST_CREATED",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log(event.type);

  res.send({ status: "OK" });
});

app.listen(PORT_NUMBER, () => {
  console.log('starting.....')
  console.log(`server is running on ${PORT_NUMBER}`);
});
