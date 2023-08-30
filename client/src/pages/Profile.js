import React from 'react';
import Auth from '../utils/auth';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { BsFillPlayCircleFill, BsFillTrash3Fill } from "react-icons/bs";

import { GET_ME } from '../utils/queries';
import { REMOVE_ALBUM } from '../utils/mutations';

import { removeAlbumId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  const [removeAlbum] = useMutation(REMOVE_ALBUM);

  console.log(userData);

  const playAudio = (url) => { 
    window.open(url);
}

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
      console.log(JSON.stringify(err, null, 2));
    }
  };
  if (loading) {
    return <h2 variant="h2">LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved albums!</h1>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
         
          {userData.savedAlbums.length
            ? `Viewing ${userData.savedAlbums.length} saved ${userData.savedAlbums.length === 1 ? 'album' : 'albums'}:`
            : 'You have no saved albums!'}
        </h2>
        <Row className="mx-2 row row-cols-4">
                    {userData.savedAlbums.map((album, i) => {
                        return (
                            <Card key={album.albumId}>
                                <Card.Img src={album.image} />
                                <Card.Body>
                                    <Card.Title>{album.title}</Card.Title>
                                    <Button onClick={() => playAudio(album.url)}>
                                        <BsFillPlayCircleFill />
                                    </Button>
                                    <Button onClick={() => handleDeleteAlbum(album.albumId)}>
                                        <BsFillTrash3Fill />
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
      </Container>
    </>
  )
};

export default Profile;