//WILL EDIT

// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_ALBUM } from '../../utils/mutations';
// import { saveAlbumIds, getSavedAlbumIds } from '../../utils/localStorage';

const CLIENT_ID = "89a09e72be58407ab78e6530c5d9f43a";
const CLIENT_SECRET = "963aada38bc542a49ced96d68a3d112f";

const SearchAlbums = () => {
  // create state for holding returned google api data
  const [searchedAlbums, setSearchedAlbums] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);

  // // create state to hold favorite albumId values
  // const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds())
  // // set up useEffect hook to save `favoriteAlbumIds` list to localStorage on component unmount
  // const [saveAlbum] = useMutation(SAVE_ALBUM);

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
    // return () => saveAlbumIds(savedAlbumIds);
  }, [])
  
  //Search
  async function search() {
    console.log("Search for " + searchInput); //Taylor Swift

    //Get request using search to get the Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var searchURL = 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist';
    var artistID = await fetch(searchURL, searchParameters)
    .then(response => response.json())
    .then(data => { return data.artists.items[0].id})

    // Get request with Artist ID grab all the albums from that artist
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
    console.log(data);
  });

    // Display those albums to the user

  }

  // create method to search for albums and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
    <div className="App">
      <Container>
        <h1>Search for Albums!</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='input'
                size='lg'
                placeholder='Search for Artist'
              />
            </Col>
            <Col xs={12} md={4}>
              <Button onClick={search}>
              {/* //  type='submit' variant='success' size='lg' */}
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

    <Container>
      <Row className="mx-2 row row-cols-4">
        {albums.map( (album, i) => {
          return(
       
        <Card>
          <Card.Img src={album.images[0].url} />
            <Card.Body>
              <Card.Title>Album Name Here</Card.Title>
            </Card.Body>
        </Card>
        )
      })}
      </Row>
    </Container>
    </div>
  );
};

export default SearchAlbums;}