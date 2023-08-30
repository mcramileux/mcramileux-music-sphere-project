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
//   query user($username: String!) {
//     user(username: $username) {
//       id
//       username
//       email
//        search {
//         id
//         searchAlbums
//         createdAt
//       }
//     }
//   }
// `;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       id
//       username
//       email
//       savedAlbums {
//         id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;
