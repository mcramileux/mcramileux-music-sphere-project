// ADDING THIS AGAIN FOR THE CRITERIA
import React from 'react';
// import { Container, Card, Button, ButtonGroup, Row } from 'react-bootstrap';
// import Auth from '../utils/auth';
// import { Link } from 'react-router-dom';

// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_COMMENTS } from '../utils/queries';
// import { REMOVE_COMMENT } from '../utils/mutations';

const CommentList = ({ comments = [] }) => {
    // const { albumId } = useParams();
    // const { data } = useQuery(QUERY_COMMENTS);
    // // let userData = data?.me || {};

    // const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
    //     update(cache, [ QUERY_COMMENTS ]});
    // if (!comments.length) {
    // return <h3>No Comments Yet</h3>;
  }

//     const handleRemoveComment = async (commentId) => {
//     console.log(commentId);

//     try {
//         const { data } = await removeComment({
//             variables: { commentId }
//         });
//     // userData = data;
//     // removeComment(commentId);
//     } catch (err) {
//         console.error(err);
//     }
// };

return (
    // <div>
    //   {comments &&
    //     comments.map((comment) => (
    //       <div key={comment._id} className="card mb-3">
    //         <p className="card-header">
    //           <span>{comment.commentAuthor} commented on {comment.createdAt}</span>
    //           reviewed this album on {comment.createdAt}
    //         </p>
    //         <div className="card-body">
    //           <p>{comment.commentText}</p>
    //         </div>

    //         {Auth.loggedIn() && (
    //           <button
    //             className="btn btn-primary btn-block btn-s"
    //             onClick={() => handleRemoveComment(comment.id)}>
    //             Delete this comment
    //           </button>
    //         )}
    //       </div>
    //     ))}
    // </div>
  );
};

export default CommentList;
