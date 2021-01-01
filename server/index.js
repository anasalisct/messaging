const { ApolloServer, gql, PubSub } = require("apollo-server");
// const messages = require("./graphQL/resolvers/messages");

const typeDefs = require("./graphQL/typeDefs");

const mongoose = require("mongoose");
const resolvers = require("./graphQL/resolvers");

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }) => ({ pubsub }),
  context: { pubsub },
});

mongoose
  .connect(
    "mongodb+srv://anas:anas@cluster0.qv9tf.mongodb.net/messaging?retryWrites=true&w=majority",
    { useUnifiedTopology: true },
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB connected");
    return server.listen({ port: 5001 });
  })
  .then((res) => {
    console.log("server is running", `${res.url}`);
  });
