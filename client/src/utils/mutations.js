import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SAVE_ALBUM = gql`
  mutation saveAlbum($albumData: AlbumInput!) {
    saveAlbum(albumData: $albumData) {
      _id
      username
      email
      savedAlbums {
        albumId
        artists
        artistId
        title
        url
        image
      }
    }
  }
`;

export const REMOVE_ALBUM = gql`
  mutation removeAlbum($albumId: String!) {
    removeAlbum(albumId: $albumId) {
      _id
      username
      email
      albumCount
      savedAlbum {
        albumId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation AddComment($commentText: String!, $commentAuthor: String!, $musicId: String) {
  addComment(commentText: $commentText, commentAuthor: $commentAuthor, musicId: $musicId) {
    _id
    musicId
    commentText
    commentAuthor
    createdAt
  }
}
`;

export const REMOVE_COMMENT = gql`
mutation RemoveComment($commentId: ID!) {
  removeComment(commentId: $commentId) {
    _id
    musicId
    commentText
    commentAuthor
    createdAt
  }
}
`;