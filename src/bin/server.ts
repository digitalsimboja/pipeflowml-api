import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import middleware from '../middleware/common'
import { applyMiddleware } from "../middleware";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';


// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'Hello world',
  },
};

const app = express();
const httpServer = http.createServer(app);
const port = parseInt(process.env.PORT || '8443', 10);

// Set up Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


applyMiddleware(middleware, app);


const startServer = async () => {
  await apolloServer.start()
  app.use(expressMiddleware(apolloServer))
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`GraphQL playground at http://localhost:${port}/graphql`);
  });
}

startServer()