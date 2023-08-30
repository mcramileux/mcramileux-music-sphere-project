// all good - will test it out with the front end
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      // get all users
      // users: async () => {
      //   return User.find().populate('favoriteAlbums');
      // },
      // user: async (parent, { username }) => {
      //   return User.findOne({ username }).populate('favoriteAlbums');
      // },
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select(
            '-_v -password'
          )
          return userData
        }
        throw new AuthenticationError('You need to be logged in!');
      },
  },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect email');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },

      saveAlbum: async (parent, { albumData }, context) => {
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: albumData } },
            { new: true, runValidators: true }
          );
  
          return updatedUser;
        }
        // If user attempts to execute this mutation and isn't logged in, throw an error
        throw new AuthenticationError("You need to be logged in!");
      },

      // Set up mutation so a logged in user can only remove the album and no one else's
      removeAlbum: async (parent, { albumId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { favoriteAlbums: { albumId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  };
  
  module.exports = resolvers;