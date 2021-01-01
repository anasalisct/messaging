const messagesResolvers = require("./messages");
// const usersResolvers = require("./users");
// const commentsResolvers = require("./comments");

module.exports = {
  //   Post: {
  //     likeCount: (parent) => parent.likes.length,
  //     commentCount: (parent) => parent.comments.length,
  //   },
  Query: {
    ...messagesResolvers.Query,
  },
  Mutation: {
    //   ...usersResolvers.Mutation,
    ...messagesResolvers.Mutation,
    //   ...commentsResolvers.Mutation,
  },
  Subscription: {
    //   ...usersResolvers.Mutation,
    // ...messagesResolvers.Mutation,
    ...messagesResolvers.Subscription,

    //   ...commentsResolvers.Mutation,
  },
};
