import bodyParser from "body-parser";

import express from "express";

const PORT_NUMBER = 4003;

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  res.send({ status: "OK" });
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
