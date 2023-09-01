// import React, { useState, useEffect } from 'react';
// import { Container, Card } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';

// import { searchSingleAlbum } from '../utils/API';
// import { useMutation } from '@apollo/client';
// import { useParams } from 'react-router-dom';

// import { saveAlbumIds, getSavedAlbumIds } from '../utils/localStorage';
// import { SAVE_ALBUM } from '../utils/mutations';
// import { GET_ME } from '../utils/queries';

// import Comments from '../components/Comments';
// import CommentForm from '../components/CommentForm';

// const SingleAlbum = () => {
//   // Use `useParams()` to retrieve value of the route parameter `:profileId`
//   const { albumId } = useParams();
//   const [albumData, setAlbumData] = useState({});
//   const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds());

//   const [saveAlbum] = useMutation(SAVE_ALBUM);

  
//   return (
//     <>
//     <Container>
//       <div>
//     My single album
//     </div>

//     <div>
//       <Card>
//         <div>
//         <Comments albumId={albumId} />
//         </div>
//         <div>
//           <CommentForm albumId={albumId} />
//         </div>
//         </Card>
//         </div>
//     </Container>
//     </>
//   );
// };

// export default SingleAlbum;