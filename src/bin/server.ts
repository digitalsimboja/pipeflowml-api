import "reflect-metadata"
import dotenv from 'dotenv';
dotenv.config();
import express from "express";


const app = express();
const port = parseInt(process.env.PORT || '8443', 10);

app.get("/", (_, res) => {
  res.send("Welcome to EvvelandAI Agent");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
