// to edit - will add here savedAlbums and searchAlbums
// import React from 'react';
// import { Container, Card, Button, Row, Col } from 'react-bootstrap';
// import Auth from '../utils/auth';

// import { GET_ME } from '../utils/queries';
// import { REMOVE_ALBUM } from '../utils/mutations';

// import { removeAlbumId } from '../utils/localStorage';
// import { useQuery, useMutation } from '@apollo/client';

// // const SavedAlbums = () => {
// const Profile = () => {
//   const { loading, data } = useQuery(GET_ME);
//   let userData = data?.me || {};
//   console.log(userData);
//   const [removeAlbum] = useMutation(REMOVE_ALBUM);

//   // function that accepts the album's mongo _id value as param and deletes the album from the database
//   const handleDeleteAlbum = async (albumId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { user } = await removeAlbum({
//         variables: {
//           albumId: albumId,
//         },
//       });

//       userData = user;
//       removeAlbumId(albumId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (loading) {
//     return <h2 variant="h2">LOADING...</h2>;
//   }

//   return (
//     <>
//       <div fluid className="text-light bg-dark p-5">
//         <Container>
//           <h1>Viewing saved albums!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className='pt-5'>
//           {userData.savedAlbums.length
//             ? `Viewing ${userData.Profile.length} saved ${userData.Profile.length === 1 ? 'album' : 'albums'}:`
//             : 'You have no saved albums!'}
//         </h2>
//         <Row>
//           {userData.savedAlbums.map((album) => {
//             return (
//               <Col md="4">
//                 <Card key={album.albumId} border='dark'>
//                   {album.image ? <Card.Img src={album.image} alt={`The cover for ${album.title}`} variant='top' /> : null}
//                   <Card.Body>
//                     <Card.Title>{album.title}</Card.Title>
//                     <p className='small'>Artists: {album.artists}</p>
//                     <Card.Text>{album.description}</Card.Text>
//                     <Button className='btn-block btn-danger' onClick={() => handleDeleteAlbum(album.albumId)}>
//                       Delete this Album!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Profile; 

// import React from 'react';
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// // import ThoughtForm from '../components/ThoughtForm';
// // import ThoughtList from '../components/ThoughtList';
// import SavedAlbums from '../components/SavedAlbums';

// import { QUERY_USER, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

// const Profile = () => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });

//   const user = data?.me || data?.user || {};
//   // navigate to personal profile page if username is yours
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Navigate to="/me" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <div className="flex-row justify-center mb-3">
//         {/* <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
//           Viewing {userParam ? `${user.username}'s` : 'your'} profile.
//         </h2>

//         <div className="col-12 col-md-10 mb-5">
//           <ThoughtList
//             thoughts={user.thoughts}
//             title={`${user.username}'s thoughts...`}
//             showTitle={false}
//             showUsername={false}
//           />
//         </div>
//         {!userParam && (
//           <div
//             className="col-12 col-md-10 mb-3 p-3"
//             style={{ border: '1px dotted #1a1a1a' }}
//           >
//             <ThoughtForm />
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Profile;