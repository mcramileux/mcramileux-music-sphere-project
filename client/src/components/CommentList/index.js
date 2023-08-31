// ADDING THIS AGAIN FOR THE CRITERIA
import React from 'react';
// import Auth from '../utils/auth';
// import { Container, Card, Button, ButtonGroup, Row } from 'react-bootstrap';

// import { QUERY_COMMENTS } from '../utils/queries';
// import { REMOVE_COMMENT } from '../utils/mutations';
// import { useQuery, useMutation } from '@apollo/client';

const CommentList = ({ comments = [] }) => {
    // const { albumId } = useParams();
    // const { data } = useQuery(QUERY_COMMENTS);
    // // let userData = data?.me || {};
    // const [removeComment, { loading, error }] = useMutation(REMOVE_COMMENT);

    if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

//     const handleRemoveComment = async (commentId, albumId) => {
//     console.log(commentId);
//     // const token = Auth.loggedIn() ? Auth.getToken() : null;

//     // if (!token) {
//     //     return false;
//     // }

//     try {
//         const { data } = await removeComment({
//             variables: { commentId },
//         });
//     // userData = data;
//     // removeComment(commentId);
//     } catch (err) {
//         console.error(err);
//     }
// };

return (
    <>
      <h3 className="p-5 display-inline-block" 
        style={{ borderBottom: '1px dotted #1a1a1a' }}
        >Comments</h3>

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
