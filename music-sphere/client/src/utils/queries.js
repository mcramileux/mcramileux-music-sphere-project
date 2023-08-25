//WILL EDIT
import { gql } from '@apollo/client';

// export const GET_ME = gql`
//   query me {
//     me {
//         _id
//         username
//         email
//         savedAlbums {
//             albumId
//             authors
//             description
//             title
//             image
//             link
//         }
//     }
// }
// `;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
       search {
        _id
        searchAlbums
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedAlbums {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;