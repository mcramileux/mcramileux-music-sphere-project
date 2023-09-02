// ADDING THIS AGAIN FOR THE CRITERIA
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CommentForm = ({ albumId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { loading, error }] = useMutation(ADD_COMMENT);

  if (loading) 
    return <h2>SENDING COMMENTS...</h2>;
  if (error) 
    return `LOADING COMMENTS! ${error.message}`;


const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          albumId,
          commentText,
          commentAuthor: Auth.getProfile()?.data?.username,
        },
      });

      setCommentText('');
    } catch (err) {
    //   console.error(err);
    console.log(JSON.stringify(err, null, 2));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3 className='m-2 text-center'>Please leave a comment on this album.</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-2 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>

          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3 mt-2 mt-lg-0">
              <button className="btn btn-primary btn-block" type="submit">
                Add a comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your album reviews. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;