import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("Welcome to EvvelandAI Agent");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
