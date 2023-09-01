import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
// import { BsFillPlayCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { searchSingle } from '../utils/API';
import { saveAlbumIds, getSavedAlbumIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';

import { SAVE_ALBUM } from '../utils/mutations';
import { GET_ME } from '../utils/queries'; // --STILL TO ADD QUERIES

import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';

const SingleAlbum = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState({});
  const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds());

  const [saveAlbum, { error}] = useMutation(SAVE_ALBUM, {
    update(cache, { data: { saveAlbum } }) {
      try {
        // could potentially not exist yet, so wrap in a try/catch
        // read what's currently in the cache
        const { me } = cache.readQuery({ query: GET_ME });

        // prepend the newest thought to the front of the array
        cache.writeQuery({
          query: GET_ME,
          data: { 
              me: {
                ...me,
              albums: [ ...me.albums, { ...saveAlbum},
              ],
            },
          },    
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  useEffect(() => {
    return () => saveAlbumIds(savedAlbumIds);
  });
  
  const getSingleAlbum = async (query) => {
  try {
      const response = await searchSingle(query);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const result = await response.json();

      const albumData = album.items.map((album) => ({
        albumId: album.id,
        albumName: album.name,
        albumAuthor: album.artists[0].name,
        albumImage: album.images[0].url,
        albumUrl: album.external_urls.spotify,
      }
      ));
      console.log(albumData)
      setAlbumData(albumData[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    getSingleAlbum(albumId)
  }, [])

  const handleSaveAlbum = async () => {
    // get tokens
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await saveAlbum({
        variables: { albumId: albumId },
      });

      // if album successfully saves to user's account, save album id to state
      setSavedAlbumIds([...savedAlbumIds, albumId]);
      saveAlbumIds(savedAlbumIds);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Container>
    <div>
      <Card key={albumId} className="col-xs-12 col-sm-6 col-lg-4 text-center"  style={{border:'none'}}>
        <Row>
        <Col>
        {albumId.albumImage ? (
          <Card.Img src={albumId.albumImage} alt={`The cover for ${albumId.albumName}`} variant='top' className='img-thumbnail' />
          ) : null}
        </Col>

        <Col>
          <Card.Body>
            <Card.Title>{albumId.albumName}</Card.Title>
            <Card.Text>
              {albumId.albumAuthor}
            </Card.Text>
            <a href={albumId.albumUrl} target="_blank" rel="noreferrer"> Visit Artist's Spotify Album Page</a>
            </Card.Body>
            <Card.Footer className=''>
              {Auth.loggedIn() && (
                <Button disabled={savedAlbumIds?.some((savedAlbumId) => savedAlbumId === albumId)} 
                className='btn-block btn-info' onClick={() => handleSaveAlbum(albumId)}>
                  {savedAlbumIds?.some((savedAlbumId) => savedAlbumId === albumId.albumId)
                    ? 'This album has already been saved!'
                    : 'Save this album!'}
                </Button>
              )}
              </Card.Footer>
          </Col>
        </Row>
      </Card>
    </div>

    <div>
      <Card>
        <div>
        <Comments albumId={albumId} />
        </div>
        <div>
          <CommentForm albumId={albumId} />
        </div>
        </Card>
        </div>
    </Container>
    </>
  );
};

export default SingleAlbum;
