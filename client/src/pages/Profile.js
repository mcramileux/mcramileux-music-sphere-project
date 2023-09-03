import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { Container, Card, Button, ButtonGroup, Modal, Row } from 'react-bootstrap';
import { BsFillPlayCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";

import { REMOVE_ALBUM } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { removeAlbumId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';

import CommentForm from '../components/CommentForm';
import CommentList from '../components/Comments';

const Profile = () => {
  const [show, setShow] = useState(false);
  const [currentAlbumId, setCurrentAlbumId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (albumId) => {
    setShow(true);
    setCurrentAlbumId(albumId);
  };

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
              <Card key={i} className="col-xs-12 col-sm-6 col-lg-4 text-center" style={{ border: 'none' }}>
                <Card.Img src={album.image} />
                <Card.Body>
                  <Card.Title style={{ height: '50px' }}>{album.title}</Card.Title>
                  <ButtonGroup style={{ width: '100%' }}>
                    <Button onClick={() => playAudio(album.url)}>
                      <BsFillPlayCircleFill />
                    </Button>
                    <Button onClick={() => handleShow(album.albumId)}>
                      <FaCommentAlt />
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show ? (
            <>
              <div className="my-5">
                <CommentForm albumId={currentAlbumId} />
              </div>
              <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <CommentList albumId={currentAlbumId} />
              </div>
            </>
          ) : (
            <div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default Profile;