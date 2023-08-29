import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Auth from '../utils/auth';

// Import Apollo hook and mutation
import { useMutation } from '@apollo/client';
import { SAVE_ALBUM } from '../utils/mutations';

// import { searchSpotifyAlbums } from '../utils/API';
import { saveAlbumIds, getSavedAlbumIds } from '../utils/localStorage';

const CLIENT_ID = "89a09e72be58407ab78e6530c5d9f43a";
const CLIENT_SECRET = "963aada38bc542a49ced96d68a3d112f";

const SearchAlbums = () => {
    // const [searchedAlbums, setSearchedAlbums] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds());
    const [saveAlbum] = useMutation(SAVE_ALBUM);
    const [accessToken, setAccessToken] = useState('');
    const [albums, setAlbums] = useState([]);

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



    // Search Spotify API
    async function searchSpotifyAlbums(searchQuery) {


        //Get request using search to get the Artist ID
        var accessControl = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };
        try {

            //Get request using search to get the Artist ID
            var getArtistId = 'https://api.spotify.com/v1/search?q=' + searchQuery + '&type=artist';
            var artistId = await fetch(getArtistId, accessControl)
                .then(response => response.json())
                .then(data => {
                    console.log('ARTIST');
                    console.log(data);
                    return data.artists.items[0].id
                });

            //Get request to get the Albums from the Artist ID
            var getAlbums = 'https://api.spotify.com/v1/artists/' + artistId + '/albums?include_groups=album&market=US&limit=50';
            var returnedAlbums = await fetch(getAlbums, accessControl)
                .then(response => response.json())
                .then(data => {
                    console.log('ALBUMS');
                    console.log(data);
                    data.artistId = artistId;
                    return data;
                });

            return returnedAlbums;

        }
        catch (err) {
            console.error(err);
            return [];
        }
    };

    // create method to search for albums and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            alert('Please enter an artist name');
            return false;
        }

        searchSpotifyAlbums(searchInput).then(data => {
            var artistId = data.artistId;
            const albumData = data.items.map((album) => ({
                albumId: album.id,
                artists: album.artists.map(artist => artist.name).join(', '), // Convert artists array to a string
                artistId: artistId,
                title: album.name,
                url: album.external_urls.spotify,
                image: album.images[0].url
            }));
            console.log('ALBUM DATA');
            console.log(albumData);
            setAlbums(albumData);
            // setSearchInput('gobbledegook');


        });
        //     const albumData = albums.map((album) => ({
        //         // albumId: album.id,
        //         // artists: album.volumeInfo.authors || ['No artist to display'],
        //         // title: album.volumeInfo.title,
        //         // description: album.volumeInfo.description,
        //         // image: album.volumeInfo.imageLinks?.thumbnail || '',
        //         albumId: album.id,
        //         artists: album.artists.map(artist => artist.name).join(', '), // Convert artists array to a string
        //         title: album.name,
        //         description: album.description,
        //         image: album.images[0].url,
        //     }));

        //     setAlbums(albumData);
        //     setSearchInput('');
        // } catch (err) {
        //     console.error(err);
        // }
    };

    // create function to handle saving an album to our database
    const handleSaveAlbum = async (albumId) => {
        // find the album in `searchedAlbums` state by the matching id
        const albumToSave = albums.find((album) => album.albumId === albumId);

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
                                placeholder='Search for an artist'
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

            <Container>
                <Row className="mx-2 row row-cols-4">
                    {albums.map((album, i) => {
                        console.log(album);
                        return (
                        <Card>
                            <Card.Img src={album.image} />
                            <Card.Body>
                                <Card.Title>{album.title}</Card.Title>
                            </Card.Body>
                        </Card>
                        )
                    })}
                </Row>
            </Container>
            {Auth.loggedIn() ? (
                // JSX content for authenticated user
                <div>
                    {/* Render your authenticated user content here */}
                    {albums.map(album => (
                        <div key={album.albumId}>
                            <h2>{album.title}</h2>
                            <p>Artists: {album.artists}</p>
                            {/* Additional album details */}
                            <Button onClick={() => handleSaveAlbum(album.albumId)}>Save Album</Button>
                        </div>
                    ))}
                </div>
            ) : (
                // JSX content for non-authenticated user
                <p>
                    You need to be logged in to share your thoughts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    )
};
export default SearchAlbums;