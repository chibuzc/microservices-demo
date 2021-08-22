import axios from "axios";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";

import express from "express";

const PORT_NUMBER = 4005;

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  await axios.post("http://localhost:4000/events", event); //post service
  await axios.post("http://localhost:4001/events", event); //post service
  await axios.post("http://localhost:4002/events", event); //query service

  res.send({status: 'OK'})
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
