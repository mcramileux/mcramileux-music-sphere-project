import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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
        _id
        username
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
        authors
        image
        description
        title
        link
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
