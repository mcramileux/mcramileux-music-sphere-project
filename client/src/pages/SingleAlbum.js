import React from 'react';
import { Link } from 'react-router-dom';

// import { searchSingle } from '../utils/API'; ----NEED TO ADD SPOTIFY API HERE

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';
// import { useQuery } from '@apollo/client'; ----MIGHT NEED THIS

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
// import { GET_ME } from '../utils/queries'; --STILL TO ADD QUERIES
// import { QUERY_SINGLE_ALBUM } from '../utils/queries'; - STILL TO ADD QUERIES
import Auth from '../utils/auth';

const SingleAlbum = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { albumId } = useParams();
  const [saveAlbum] = useMutation(SAVE_MOVIE);
  const [albumData, setAlbumData] = useState({});
  const [albumIds, setSavedAlbumIds] = useState(getSavedAlbumIds());

  const { loading, data } = useQuery(QUERY_SINGLE_ALBUM, {
    // pass URL parameter
    variables: { albumId: albumId },
  });

  const album = data?.album || {};

  if (loading) {
    return <div>LOADING ALBUM...</div>;
  }
  return (
    <div className="my-3">
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
    </div>
  );
};

export default SingleAlbum;
