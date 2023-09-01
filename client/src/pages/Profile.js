import React from 'react';
import Auth from '../utils/auth';
import { Container, Card, Button, ButtonGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
          <h1>Viewing your favourite albums!</h1>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
         
          {userData.savedAlbums.length
            ? `Your ${userData.savedAlbums.length} saved ${userData.savedAlbums.length === 1 ? 'album' : 'albums'}:`
            : 'You have no saved albums!'}
        </h2>
                  <Row>
                    {userData.savedAlbums.map((album, i) => {
                        return (
                          <Card key={i} className="col-xs-12 col-sm-6 col-lg-4 text-center"  style={{border:'none'}}>
                                <Card.Img src={album.image} />
                                <Card.Body>
                                    <Card.Title style={{height:'50px'}}>{album.title}</Card.Title>
                                    <p><Link className='btn-block btn-link' to={`/album/${album.albumId}`}> 
                                      View Album Details</Link></p>
                                    <ButtonGroup style={{width:'100%'}}>
                                    <Button onClick={() => playAudio(album.url)}>
                                        <BsFillPlayCircleFill />
                                    </Button>
                                    <Button onClick={() => handleDeleteAlbum(album.albumId)}>
                                        <BsFillTrash3Fill />
                                    </Button>
                                    </ButtonGroup>
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