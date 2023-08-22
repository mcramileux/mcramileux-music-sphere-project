import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import Auth from '../utils/auth';

import { GET_ME } from '../utils/queries';
import { REMOVE_ALBUM } from '../utils/mutations';

import { removeAlbumId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';

const SavedAlbums = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  console.log(userData);
  const [removeAlbum] = useMutation(REMOVE_ALBUM);

  // function that accepts the album's mongo _id value as param and deletes the album from the database
  const handleDeleteAlbum = async (albumId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { user } = await removeAlbum({
        variables: {
          albumId: albumId,
        },
      });

      userData = user;
      removeAlbumId(albumId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2 variant="h2">LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1 className="text-center">Your Favorite Albums!</h1>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {userData.savedAlbums?.length
            ? `Viewing ${userData.savedAlbums.length} saved ${
                userData.savedAlbums.length === 1 ? 'album' : 'albums'
              }:`
            : 'You have no saved albums!'}
        </h2>

        <Row>
          {userData.savedAlbums.map((album) => (
            <Col xs={12} sm={6} md={4} key={album.albumId}>
              <Card>
                {album.image && (
                  <Card.Img
                    variant="top"
                    src={album.image}
                    alt={`The cover for ${album.title}`}
                  />
                )}
                <Card.Body>
                  <Card.Text>Authors: {album.authors}</Card.Text>
                  <Card.Text>{album.description}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAlbum(album.albumId)}
                  >
                    Delete this Album!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedAlbums;
