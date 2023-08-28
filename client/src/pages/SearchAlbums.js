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
    // async function searchSpotifyAlbums(searchQuery) {
    async function searchSpotifyAlbums(searchQuery) {
        console.log("Search for " + searchQuery); //search an artist

        //Get request using search to get the Artist ID
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=artist', searchParameters)
            .then(response => response.json())
            //   .then(data => console.log(data)) to test if it works
            .then(data => {
                console.log(data)
                return data.items
            })
        // .then(data => { return data.artists })
        // .then(data => { return data.artists.items[0].id })

        console.log("Artist ID is " + artistID);
        // Get request with Artist ID grab all the albums from that artist
        // var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         setAlbums(data.items);
        //     });

        // Display those albums to the user
        // try {
        //     // const response = await searchSpotifyAlbums(searchInput);
        //     const response = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
        //     // const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=album`)

        //     if (!response.ok) {
        //         throw new Error('Failed to fetch from Spotify!');
        //     }

        //     // const { items } = await response.json();
        //     const data = await response.json();
        //     return data.albums;
        //     // return data.albums.items;
        // } catch (err) {
        //     throw (err);
        // }
    };

    // create method to search for albums and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }
    };

    try {
        const albums = searchSpotifyAlbums(searchInput);
        console.log(albums);

        const albumData = albums.map((album) => ({
            // albumId: album.id,
            // artists: album.volumeInfo.authors || ['No artist to display'],
            // title: album.volumeInfo.title,
            // description: album.volumeInfo.description,
            // image: album.volumeInfo.imageLinks?.thumbnail || '',
            albumId: album.id,
            artists: album.artists.map(artist => artist.name).join(', '), // Convert artists array to a string
            title: album.name,
            description: album.description,
            image: album.images[0].url,
        }));

        setAlbums(albumData);
        setSearchInput('');
    } catch (err) {
        console.error(err);
    };

    // create function to handle saving a album to our database
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
                        // return (
                        <Card>
                            <Card.Img src={album.images[0].url} />
                            <Card.Body>
                                <Card.Title>{album.name}</Card.Title>
                            </Card.Body>
                        </Card>
                        // )
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





// ... (other imports)

// const SearchAlbums = () => {
//     const [searchInput, setSearchInput] = useState('');
//     const [accessToken, setAccessToken] = useState('');
//     const [albums, setAlbums] = useState([]);
//     // ... (other state and useEffect logic)

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

//         if (!searchInput) {
//             return false;
//         }

//         try {
//             const albums = await searchSpotifyAlbums(searchInput);
//             // ... (rest of the logic)
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleSaveAlbum = async (albumId) => {
//         // ... (album saving logic)
//     };

//     return (
//         <div>
//             <Container>
//                 {/* ... (form and search UI) */}
//             </Container>

//             <Container>
//                 <Row className="mx-2 row row-cols-4">
//                     {albums.map((album, i) => (
//                         <Card key={i}>
//                             <Card.Img src={album.images[0].url} />
//                             <Card.Body>
//                                 <Card.Title>{album.name}</Card.Title>
//                             </Card.Body>
//                         </Card>
//                     ))}
//                 </Row>
//             </Container>
//             {/* {Auth.loggedIn() ? (
//                 // ... (authenticated user JSX content)
//             ) : (
//                 // ... (non-authenticated user JSX content)
//             )} */}
//         </div>
//     );
// };

// export default SearchAlbums;
