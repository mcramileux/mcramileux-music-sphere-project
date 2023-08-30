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
      id
      username
      email
        savedAlbums {
          albumId
          artist
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
      id
      username
      email
      savedAlbums {
        albumId
        artist
        artistId
        title
        url
        image
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation AddComment($commentText: String!, $commentAuthor: String!, $albumId: String) {
  addComment(commentText: $commentText, commentAuthor: $commentAuthor, albumId: $albumId) {
    id
    albumId
    commentText
    commentAuthor
    createdAt
  }
}
`;

export const REMOVE_COMMENT = gql`
mutation RemoveComment($commentId: ID!) {
  removeComment(commentId: $commentId) {
    id
    albumId
    commentText
    commentAuthor
    createdAt
  }
}
`;