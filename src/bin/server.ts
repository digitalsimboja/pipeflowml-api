import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import middleware from '../middleware/common'
import { AppDataSource } from "../config/datasource";
import { applyMiddleware } from "../middleware";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import { router } from "../api/routes";
import { buildSchema } from "type-graphql";
import AuthResolver from "../api/graphql/resolvers/auth";

const getSchema = async () => {
  return await buildSchema({
    resolvers: [AuthResolver]
  })
}

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const port = parseInt(process.env.PORT || '8443', 10);

  applyMiddleware(middleware, app);
  app.use(router)


  const schema = await getSchema()
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  try {
    await AppDataSource.initialize();
    console.log('Database connection successful');

    await apolloServer.start();
    app.use(expressMiddleware(apolloServer));

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      console.log(`GraphQL playground at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

startServer()