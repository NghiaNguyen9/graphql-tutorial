const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// load schema & resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

// Load db methods
const mongoDataMethods = require('./data/db');
// connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nghianxdev:123%40456@tutorialgraphql.mrf0r.mongodb.net/TutorialGraphQL?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
connectDB();
async function startApolloServer(typeDefs, resolvers, mongoDataMethods) {
  // Same ApolloServer initialization as before
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })
  })

  // Required logic for integrating with Express
  await server.start();

  const app = express();
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/'
  });
  // Modified server startup
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(typeDefs, resolvers, mongoDataMethods)


