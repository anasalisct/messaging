// const checkAuth = require("../../utils/checkAuth");
const { AuthenticationError } = require("apollo-server");
const Messages = require("../../models/Messages");

// const subscribers = [];
// const onMessageUpdates = (fn) => subscribers.push(fn);
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

module.exports = {
  Query: {
    // getMessage: () => message,
    async getMessage() {
      try {
        const message = await Messages.find();
        return message;
      } catch (err) {
        throw new Error(err);
      }
    },
    // async getPost(_, { postId }) {
    //   try {
    //     const post = await Post.findById(postId);
    //     if (post) {
    //       return post;
    //     } else {
    //       throw new Error("Post not Found");
    //     }
    //   } catch (error) {
    //     throw new Error("post ", error);
    //   }
    // },
  },
  Mutation: {
    async createMessages(_, { username, body }, context) {
      // const user = checkAuth(context);

      const newMessages = new Messages({
        body,
        //   user: user.id,
        username: username,
        createdAt: new Date().toISOString(),
      });

      const post = await newMessages.save();
      console.log(
        "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppost"
      );
      subscribers.forEach((fn) => fn());
      console.log(subscribers);
      // context.pubsub.publish("NEW_POST", {
      //   getMessage: post,
      // });
      return post;
    },
  },
  // Subscription: {
  //   getMessage: {
  //     // Additional event labels can be passed to asyncIterator creation
  //     subscribe: () => pubsub.asyncIterator([POST_ADDED]),
  //   },
  // },
  // Subscription: {
  //   getMessage: {
  //     subscribe: async (parent, args, { pubsub }) =>
  //       pubsub.asyncIterator("NEW_POST"),
  //   },
  // },
  Subscription: {
    getMessage: {
      subscribe: async (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        const messages = await Messages.find();
        onMessagesUpdates(() =>
          pubsub.publish(channel, { getMessage: messages })
        );

        setTimeout(() => pubsub.publish(channel, { getMessage: messages }), 0);
        console.log("sssssssssssssssone");

        return pubsub.asyncIterator(channel);
      },
    },
  },
};
