import axios from "axios";
import bodyParser from "body-parser";

import express from "express";

const PORT_NUMBER = 4003;

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "COMMENT_CREATED":
      const status = data.content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://localhost:4005/events", {
        type: "COMMENT_MODERATED",
        data: {
          id: data.id,
          postID: data.postID,
          status,
          content: data.content,
        },
      });

      break;

    default:
      console.log("unknown event type");
      break;
  }

  res.send({ status: "OK" });
});

app.listen(PORT_NUMBER, () => {
  console.log(`server is running on ${PORT_NUMBER}`);
});
