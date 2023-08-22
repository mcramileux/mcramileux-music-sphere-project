import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    setValidated(true);

    if (form.checkValidity()) {
      try {
        const { data } = await loginUser({
          variables: { ...userFormData },
        });

        console.log(data);
        Auth.login(data.login.token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

      setUserFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />

          <Form.Control.Feedback type='invalid'>
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Please provide a password.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
