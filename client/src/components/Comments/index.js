// ADDING THIS AGAIN FOR THE CRITERIA
import React from 'react';
import { useQuery } from '@apollo/client';
// import CommentList from '../components/CommentList';
// import { QUERY_COMMENTS } from '../utils/queries';

const Comments = ({ albumId }) => {
  // const { loading, data } = useQuery(QUERY_COMMENTS, {
  //   variables: {albumId: albumId}
  // });
  // const comments = data?.comments || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 mb-3">
          {/* {loading ? (
            <div>LOADING REVIEWS...</div>
          ) : ( */}
          {/* <CommentList
              // comments={comments}
              albumId={albumId}
              title="Music Album Reviews"
            /> */}
          {/* )} */}
        </div>
      </div>
    </main>
  );
};

export default Comments;