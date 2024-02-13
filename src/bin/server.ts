import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import middleware from '../middleware/common'
import { AppDataSource } from "../config/datasource";
import { applyMiddleware } from "../middleware";
// import http from 'http';
import { router } from "../api/routes";
import { initApolloServer } from "../config/apolloServer";

const startServer = async () => {
  const app = express();
  //const httpServer = http.createServer(app);
  const port = parseInt(process.env.PORT || '8443', 10);

  applyMiddleware(middleware, app);
  app.use(router);

  try {
    // Initialize Apollo Server
    const apolloServer = await initApolloServer();

    await AppDataSource.initialize();
    console.log('Database connection successful');

    apolloServer.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      console.log(`GraphQL playground at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error('Error initializing server:', error);
  }
};

void startServer();