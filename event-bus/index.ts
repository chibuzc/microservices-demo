import axios from "axios";
import bodyParser from "body-parser";

import express from "express";

const PORT_NUMBER = 4005;

const app = express();
app.use(bodyParser.json());

let events: {
  type: string;
  data: {
    id: string;
    postID: string;
    status: string;
    content: string;
  };
}[] = [];

app.get("/events", async (req, res) => {
  res.send(events);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);


  axios.post("http://post-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });




  // try {
  //   await axios.post("http://localhost:4000/events", event); //post service
  //   await axios.post("http://localhost:4001/events", event); //comments service
  //   await axios.post("http://localhost:4002/events", event); //query service
  //   await axios.post("http://localhost:4003/events", event); //moderation service
  // } catch (error) {
  //   console.log(error);
  // }

  res.send({ status: "OK" });
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
