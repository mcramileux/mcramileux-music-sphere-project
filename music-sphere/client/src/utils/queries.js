//WILL ADD MORE - COMMENTS AND PROFILE???
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
        _id
        username
        email
        savedAlbums {
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