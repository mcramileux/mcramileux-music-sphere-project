import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
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

// export const QUERY_USER = gql`
//   query user($userId: ID!) {
//     user(userId: $userId) {
//         id
//         username
//         email
//         savedAlbums {
//           albumId
//           artist
//           artistId
//           title
//           url
//           image
//           comments{
//             id
//             albumId
//             commentText
//             commentAuthor
//             createdAt
//           }
//         }
//       }
//     }
//   `;


// export const QUERY_ALBUMS = gql`
//     query Albums {
//       albums {
//         id
//         albumId
//         artist
//         artistId
//         title
//         url
//         image
//         comments {
//           id
//           albumId
//           commentText
//           commentAuthor
//           createdAt
//         }
//       }
//   `;

  // export const QUERY_SINGLE_ALBUM = gql`
  //   query getSingleAlbum($albumId: albumId!) {
  //     singleAlbum(albumId: $albumId) {
  //       albumId
  //       artist
  //       artistId
  //       title
  //       url
  //       image
  //       comments {
  //         id
  //         albumId
  //         commentText
  //         commentAuthor
  //         createdAt
  //       }
  //     }
  //   }
  // `;

export const QUERY_COMMENTS = gql`
  query Comments($albumId: String!) {
    comments(albumId: $albumId) {
      id
      albumId
      commentText
      commentAuthor
      createdAt
    }
  }
`;