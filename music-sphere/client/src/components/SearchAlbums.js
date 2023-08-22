import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Auth from '../utils/auth';

// Import Apollo hook and mutation
import { useMutation } from '@apollo/client';
import { SAVE_ALBUM } from '../utils/mutations';
import { saveAlbumIds, getSavedAlbumIds } from '../utils/localStorage';

const SearchAlbums = () => {
    // create state for holding returned google api data
    const [searchedAlbums, setSearchedAlbums] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
  
    // create state to hold favorite albumId values
    const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds())
    // set up useEffect hook to save `favoriteAlbumIds` list to localStorage on component unmount
    const [saveAlbum] = useMutation(SAVE_ALBUM);
  
    useEffect(() => {
      return () => saveAlbumIds(savedAlbumIds);
    }, []);
  
    // use the FAVORITE_ALBUM mutation
    // const [favoriteAlbum] = useMutation(FAVORITE_ALBUM);
  
    // create method to search for albums and set state on form submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      if (!searchInput) {
        return false;
      }
  
      try {
        const response = await fetch(
          `https://spotify23.p.rapidapi.com/search/?q=${searchInput}`
        );
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const { items } = await response.json();
  
        const albumData = items.map((album) => ({
          albumId: album.id,
          artists: album.volumeInfo.authors || ['No artist to display'],
          title: album.volumeInfo.title,
          description: album.volumeInfo.description,
          image: album.volumeInfo.imageLinks?.thumbnail || '',
        }));
  
        setSearchedAlbums(albumData);
        setSearchInput('');
      } catch (err) {
        console.error(err);
      }
    };
  
    // create function to handle saving a album to our database
    const handleSaveAlbum = async (albumId) => {
      // find the album in `searchedAlbums` state by the matching id
      const albumToSave = searchedAlbums.find((album) => album.albumId === albumId);
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await saveAlbum({
          variables: {
            albumData: albumToSave
          }
        });
  
        // if album successfully saves to user's account, save album id to state
        setSavedAlbumIds([...savedAlbumIds, albumToSave.albumId]);
      } catch (err) {
        console.error(err);
      }
    };
  

  return (
    <>
      <Container>
        <h4 className="text-center mt-3">Search for Albums!</h4>
        <Form onSubmit={handleFormSubmit}>
          <Row className="mb-3">
            <Col xs={12} md={8}>
              <Form.Control
                type="text"
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for an album"
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" variant="success" className="w-100">
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <h5 className="text-center mt-3">
          {searchedAlbums.length
            ? `Viewing ${searchedAlbums.length} results:`
            : 'Search for an album to begin'}
        </h5>
        <Row>
          {searchedAlbums.map((album) => (
            <Col xs={12} sm={6} md={4} key={album.albumId}>
              <Card className="d-flex">
                {album.image && (
                  <Card.Img
                    variant="top"
                    alt={`The cover for ${album.title}`}
                    src={album.image}
                    height="140"
                  />
                )}
                <Card.Body className="flex-fill">
                  <Card.Title>{album.title}</Card.Title>
                  <Card.Text>Artists: {album.artists}</Card.Text>
                  <Card.Text>{album.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      variant="info"
                      disabled={savedAlbumIds?.includes(album.albumId)}
                      onClick={() => handleSaveAlbum(album.albumId)}
                    >
                      {savedAlbumIds?.includes(album.albumId)
                        ? 'This album has already been chosen!'
                        : 'Favorite this Album!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchAlbums;