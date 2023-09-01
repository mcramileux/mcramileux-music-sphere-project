import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Buttom } from 'react-bootstrap';
// import { BsFillPlayCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
// import { searchSingle } from '../utils/API'; ----NEED TO ADD SPOTIFY API HERE
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';

import { SAVE_MOVIE } from '../utils/mutations';
import { GET_ME } from '../utils/queries'; // --STILL TO ADD QUERIES
// import { QUERY_SINGLE_ALBUM } from '../utils/queries'; - STILL TO ADD QUERIES
// import { useQuery } from '@apollo/client'; ----MIGHT NEED THIS

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const SingleAlbum = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState({});
  const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds());

  const [saveAlbum, { error}] = useMutation(SAVE_MOVIE, {
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

  useEffect(() => {
    if (albumId) {
      getSingleAlbum(albumId);
    } else if (data) {
      setAlbumData(data.album);
    }
  }, [])

  // const { loading, data } = useQuery(QUERY_SINGLE_ALBUM, {
  //   // pass URL parameter
  //   variables: { albumId: albumId },
  // });

  // const album = data?.album || {};

  // if (loading) {
  //   return <div>LOADING ALBUM...</div>;
  // }

  const handleSaveAlbum = async () => {
    // find the album in `searchedAlbums` state by the matching id
    const albumId = album.albumId;

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
    {/* <div className="my-3"> */}
    <div>
      <Card key={albumId} className="col-xs-12 col-sm-6 col-lg-4 text-center"  style={{border:'none'}}>
      <Row className=''>
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {album.albumAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this album on {album.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {album.albumText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={album.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm albumId={album._id} />
      </div>
      </Card>
    </div>
    </Container>
    </>
  );
};

export default SingleAlbum;
