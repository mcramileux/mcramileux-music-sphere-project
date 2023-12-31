import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import { BsFillPlayCircleFill, BsFillHeartFill } from "react-icons/bs";
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
                artist: album.artists.map(artist => artist.name).join(', '), // Convert artist array to a string
                artistId: artistId,
                title: album.name,
                url: album.external_urls.spotify,
                image: album.images[0].url
            }));
            console.log('ALBUM DATA');
            console.log(albumData);
            setAlbums(albumData);
        });
    };

    const playAudio = (url) => {
        window.open(url);
    }

    const handleSaveAlbum = async (albumId, ev) => {
        console.log('albumId' + albumId);
        // find the album in `searchedAlbums` state by the matching id
        const albumToSave = albums.find((album) => album.albumId === albumId);
        console.log(albumToSave);
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            //this code is not working
            const { data } = await saveAlbum({
                variables: {
                    albumData: albumToSave
                }
            });
            // if album successfully saves to user's account, save album id to state
            setSavedAlbumIds([...savedAlbumIds, albumToSave.albumId]);
            alert('Your album has been saved! Please go to your favorites to view.');
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div>
            <Container style={{ marginBottom: '20px' }}>
                <h1>Search for Albums!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for an artist'
                            />
                        </Col>

                        <Col xs={4}>
                            {Auth.loggedIn() ? (
                                <Button type='submit' variant='danger' size='lg' >
                                    Search
                                </Button>
                            ) : (
                                <Button type='submit' variant='danger' size='lg' disabled>
                                    Search
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Container>
                <Row>
                    {albums.map((album, i) => {
                        return (
                            <Card key={i} className="col-xs-12 col-sm-6 col-lg-4 text-center" style={{ border: 'none' }}>
                                <Card.Img src={album.image} />
                                <Card.Body>
                                    <Card.Title style={{ height: '50px' }}>{album.title}</Card.Title>
                                    <ButtonGroup style={{ width: '100%' }}>
                                        <Button onClick={() => playAudio(album.url)}>
                                            <BsFillPlayCircleFill />
                                        </Button>
                                        <Button onClick={(ev) => handleSaveAlbum(album.albumId, ev)}>
                                            <BsFillHeartFill />
                                        </Button>
                                    </ButtonGroup>
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