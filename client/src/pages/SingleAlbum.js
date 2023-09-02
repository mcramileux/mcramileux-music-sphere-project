import React, { useState, useEffect } from 'react';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import { searchSingleAlbum } from '../utils/API';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

// import { saveAlbumIds, getSavedAlbumIds } from '../utils/localStorage';
// import { SAVE_ALBUM } from '../utils/mutations';
// import { QUERY_SINGLE_ALBUM } from '../utils/queries';

import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';

const SingleAlbum = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState({});

console.log(albumId);

  // const { loading, error, data } = useQuery(QUERY_SINGLE_ALBUM, {
  //   // pass URL parameter
  //   variables: { albumId: albumId },
  // });
  // const album = data?.singleAlbum || {};
  // console.log(album);



  //const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds());

  // const [saveAlbum] = useMutation(SAVE_ALBUM, {
  //   update(cache, { data: { saveAlbum } }) {
  //     try {
  //       // read what's currently in the cache
  //       const { me } = cache.readQuery({ query: GET_ME });
  //       // prepend the newest thought to the front of the array
  //       cache.writeQuery({
  //         query: GET_ME,
  //         data: {
  //           me: {
  //             ...me,
  //             albums: [
  //               ...me.albums,
  //               { ...saveAlbum }
  //             ],
  //           },
  //         },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // });

  // useEffect(() => {
  //   return () => saveAlbumIds(savedAlbumIds);
  // });

  // const getSingleAlbum = async (query) => {
  //   try {
  //     const response = await searchSingleAlbum(query);
  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }
  //     const album = await response.json();

  //     const Data = {
  //       albumId: album.id,
  //       artist: album.artists[0].name,
  //       // artist: album.artists.map(artist => artist.name).join(', '),
  //       artistId: album.artists[0].id,
  //       //artistId: artistId,
  //       title: album.name,
  //       url: album.external_urls.spotify,
  //       image: album.images[0].url
  //     }
  //     console.log('SINGLE ALBUM DATA');
  //     console.log(Data);
  //     setAlbumData(Data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   getSingleAlbum(albumId)
  // }, [])


  // create function to handle saving a profile to our database
  // const handleSaveAlbum = async () => {
  //   // console.log('albumId' + albumId);
  //   // const albumToSave = albumData;
  //   // console.log(albumToSave);
  //   //get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     await saveAlbum({
  //       variables: { ...albumData },
  //     });

  //     // if album successfully saves to user's account, save album id to state
  //     setSavedAlbumIds([...savedAlbumIds, albumId]);
  //     saveAlbumIds(savedAlbumIds);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) return `Error! ${error.message}`;

  return (
    <>
      <Container>
        <div>
          <Card key={albumId} className='mt-4' border='secondary'>
            <Row>
              <Col md={4}>
                {albumData.images?.length ? (
                  //{albums.map((album, i) => {
                  <Card.Img src={albumData.images?.[0].url} alt={`The cover for ${albumData.name}`} variant='top' />
                ) : null}
                {/* <Card.Img src={albumData.image} /> */}
              </Col>

              <Col md={8}>
                <Card.Body>
                  <Card.Title>{albumData.name}</Card.Title>
                  <Card.Img src={albumData.image} />
                  {/* <p className='small'>Image: {albumData.images?.[0].url}</p> */}
                  <p className='small'>Album ID: {albumData.id}</p>
                  <p className='small'>Artist: {albumData.artists}</p>
                  <p className='small'>Artist ID: {albumData.artists?.[0].id}</p>
                  <p className='small'>Album Title: {albumData.name}</p>
                  <p className='small'>Release Date: {albumData.release_date}</p>
                  <p className='small'>Total Tracks: {albumData.total_tracks}</p>
                  <Card.Text className='fs-4'>{albumData.overview}</Card.Text>
                  <a href={albumData.url} target='_blank' rel='noopener noreferrer'>
                    Visit on Spotify</a>
                  {/*<p><Link className='btn-block btn-link' to={`/album/${album.albumId}`}> 
                                      Visit on Spotify</Link></p>  */}
                </Card.Body>

                <Card.Footer className='text-muted'>
                  {Auth.loggedIn() && (
                    <Button
                      
                      className='btn btn-primary btn-block mt-auto'
                      onClick={() => ''}>
                     
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