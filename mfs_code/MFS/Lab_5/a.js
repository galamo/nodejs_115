const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("Health check");
});

app.listen(5000, () => {
  console.log(`Server is listenning to Port ${5000}`);
});
