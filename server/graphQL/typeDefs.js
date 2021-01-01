const gql = require("graphql-tag");

module.exports = gql`
  type Message {
    id: ID!
    body: String
    # createdAt: String!
    username: String!
    createdAt: String!
    # comments: [Comments]!
    # likes: [Like]!
    # commentCount: Int!
    # likeCount: Int!
  }
  #   type Comments {
  #     id: ID!
  #     createdAt: String!
  #     username: String!
  #     body: String!
  #   }
  #   type Like {
  #     id: ID!
  #     createdAt: String!
  #     username: String!
  #   }
  #   type User {
  #     id: ID!
  #     email: String!
  #     token: String!
  #     username: String!
  #     createdAt: String!
  #   }
  #   input RegisterInput {
  #     username: String!
  #     password: String!
  #     confirmPassword: String!
  #     email: String!
  #   }
  type Query {
    getMessage: [Message]
    # getPost(postId: ID!): Post
  }
  type Mutation {
    #   register(registerInput: RegisterInput): User!
    #   login(username: String!, password: String!): User!
    createMessages(username: String!, body: String!): Message!
    #   deletePost(postId: ID!): String!
    #   createComment(postId: ID!, body: String!): Post!
    #   deleteComment(postId: ID!, commentId: ID!): Post!
    #   likePost(postId: ID!): Post!
  }
  type Subscription {
    getMessage: [Message!]
    # getPost(postId: ID!): Post
  }
`;
