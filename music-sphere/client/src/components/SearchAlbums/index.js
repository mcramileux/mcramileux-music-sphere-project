//WILL EDIT

// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
// import { ADD_THOUGHT } from '../../utils/mutations';
// import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import { SAVE_ALBUM } from '../../utils/mutations';
import { saveAlbumIds, getSavedAlbumIds } from '../../utils/localStorage';

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
        `https://api.deezer.com/search?q=${query}`
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

// const ThoughtForm = () => {
//   const [thoughtText, setThoughtText] = useState('');

//   // const [characterCount, setCharacterCount] = useState(0);

//   const [addThought, { error }] = useMutation(ADD_THOUGHT, {
//     update(cache, { data: { addThought } }) {
//       try {
//         const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

//         cache.writeQuery({
//           query: QUERY_THOUGHTS,
//           data: { thoughts: [addThought, ...thoughts] },
//         });
//       } catch (e) {
//         console.error(e);
//       }

//       // update me object's cache
//       const { me } = cache.readQuery({ query: QUERY_ME });
//       cache.writeQuery({
//         query: QUERY_ME,
//         data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
//       });
//     },
//   });
//   const searchInput = () => { }
//   const setSearchInput = () => { }

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { data } = await addThought({
//         variables: {
//           thoughtText,
//           thoughtAuthor: Auth.getProfile().data.username,
//         },
//       });

//       setThoughtText('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

  // part of ThoughtForm
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'thoughtText' && value.length <= 280) {
  //     setThoughtText(value);
  //     setCharacterCount(value.length);
  //   }
  // };

  return (
    <div>

      <Container>
        <h1>Search for Albums!</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='Search for a album'
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type='submit' variant='success' size='lg'>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {Auth.loggedIn() ? (
        <Container>
         <h2 className='pt-5'>
          {searchedAlbums.length
            ? `Viewing ${searchedAlbums.length} results:`
           : 'Search for a album to begin'}
        </h2>
         <Row> 
         {searchedAlbums.map((album) => {
          return (
              <Col md="4">
                <Card key={album.albumId} border='dark'>
                  {album.image ? (
                     <Card.Img src={album.image} alt={`The cover for ${album.title}`} variant='top' />
                   ) : null}
                   <Card.Body>
                    <Card.Title>{album.title}</Card.Title>
                    <p className='small'>Authors: {album.authors}</p>
                   <Card.Text>{album.description}</Card.Text>
                   {Auth.loggedIn() && (                     
                    <Button
                      disabled={savedAlbumIds?.some((savedAlbumId) => savedAlbumId === album.albumId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveAlbum(album.albumId)}>
                        {savedAlbumIds?.some((savedAlbumId) => savedAlbumId === album.albumId)
                          ? 'This album has already been saved!'
                          : 'Save this Album!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
             </Col>
            );          })}
       </Row>
     </Container> 

      ) : (
        <p className="text-center">
          You need to be logged in to search for your albums. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

// export default ThoughtForm;
export default SearchAlbums;