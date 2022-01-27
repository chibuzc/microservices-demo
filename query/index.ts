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

const handleEvent = (
  type: string,
  data: {
    id: string;
    content: string;
    postID: string;
    status: "pending" | "approved" | "rejected";
    title: string;
  }
) => {
  if (type === "POST_CREATED") {
    const { id, title } = data;

    posts[id] = { ...data, comments: [] };
  }
  if (type === "COMMENT_CREATED") {
    const { id, content, postID, status } = data;

    posts[postID].comments.push({ id, content, status });

    console.log("comment++++++", posts[postID]);
  }
  if (type === "COMMENT_UPDATED") {
    const { id, content, postID, status } = data;

    const post = posts[postID];

    console.log("+++++++++++++", post);

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment!.status = status;
    comment!.content = content;

    // console.log("comment++++++", comment);
  }
};

app.get("/posts", async (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log("reqbody++++++", req.body);

  handleEvent(type, data);

  console.log(JSON.stringify(posts));
  res.status(200).send(posts);
});

app.listen(PORT_NUMBER, async () => {
  console.log(`server is running on ${PORT_NUMBER}`);

  try {
    const res = await axios.get("http://event-bus-srv:4005/events");

    for (let event of res.data) {
      console.log("processing event", event.type);

      handleEvent(event.type, event.data);
    }

  } catch (error) {

    console.log('error', error)

  }
});
