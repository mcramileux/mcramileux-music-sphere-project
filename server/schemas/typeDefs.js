// all good - but will test it out with the front end
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me: User
  }

type User {
    id: ID
    username: String!
    email: String!
    password: String
    savedAlbums: [Album]
  }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveAlbum(albumData: AlbumInput!): User
    removeAlbum(albumId: String!): User
    
}

input AlbumInput{
    albumId: String!
    artist: String
    artistId: String
    title: String!
    url: String
    image: String
}

type Album {
    albumId: String!
    artist: String
    artistId: String
    title: String!
    url: String
    image: String
}


type Auth {
    token: ID!
    user: User
}
`;

module.exports = typeDefs;