// import React, { useState, useEffect } from 'react';

import { QUERY_COMMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client'; // took out useMutation

const CommentList = ({ albumId }) => {
  // const { loading, error, data } = useQuery(QUERY_COMMENTS);
  // let comments = data?.me || {};

  //setAlbumComments(comments);

  // if (!comments.length) {
  //   return <h3>No Comments Yet</h3>;
  // }
  const { loading, error, data } = useQuery(QUERY_COMMENTS, {
    variables: { albumId }, // Pass albumId as a variable to the query
  });

  if (loading) {
    return <h3>Loading comments...</h3>;
  }

  if (error) {
    console.error(error);
    return <h3>Error loading comments</h3>;
  }

  const comments = data?.comments || [];

  if (comments.length === 0) {
    return <h3>No Comments Yet</h3>;
  }
  
  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
