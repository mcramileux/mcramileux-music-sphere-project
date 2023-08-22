import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData }
      });

      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <>
      <Form noValidate onSubmit={handleFormSubmit}>
        <Alert
          show={showAlert}
          onClose={() => setShowAlert(false)}
          variant='danger'
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={userFormData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={userFormData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={userFormData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type='submit'
          variant='primary'
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;