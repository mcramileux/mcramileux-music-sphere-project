import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

export default function Contact() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [sentMessage, setSentMessage] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setFullNameError(false);
      setEmailError(false);
      setMessageError(false);
  
      if (fullName === '') {
        setFullNameError(true);
        return;
      }
  
      const validateEmail = /^[\w.-]+@[\w.-]+\.\w+$/;
      if (!validateEmail.test(email)) {
        setEmailError(true);
        return;
      }
      if (message === '') {
        setMessageError(true);
        return;
      }
  
      console.log(`Name: ${fullName}, Email: ${email}, Message: ${message}`);
      // If everything goes according to plan, we want to clear out the input after a successful registration.
      setFullName('');
      setEmail('');
      setMessage('');
      setMessageError('');
      setSentMessage(true);
    };

  return (
    <section style={{ height: '1050px' }} id="contact">
      <Container>
        <div className="px-4 py-4 px-lg-5 py-lg-5 bg-white rounded">
          <Row className="gx-4 gx-lg-5 justify-content-center mx-auto">
            <Col lg={8} xl={6} className="text-center">
              <h1 className="mb-4">Contact Me</h1>
              {/* <p className="text-muted mb-5">
                Do you want to collaborate with me? Please do not hesitate to
                contact me directly. I will come back to you within a matter of
                hours to help you.
              </p> */}

              <ul className="text-muted mb-5">
                <li>📧 mcramileux@gmail.com</li>
                <li>☎️ +61 0484 622 654</li>
                <li>🇦🇺 Cairns, Queensland</li>
              </ul>

              <hr />

              {!sentMessage ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      className={`${
                        fullNameError ? 'is-invalid' : ''
                      }`}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {fullNameError && (
                      <Form.Control.Feedback type="invalid">
                        Please enter your name
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control
                      type="email"
                      className={`${
                        emailError ? 'is-invalid' : ''
                      }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email address
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className={`${
                        messageError ? 'is-invalid' : ''
                      }`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    {messageError && (
                      <Form.Control.Feedback type="invalid">
                        Please enter your message
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="info"
                    style={{ fontSize: '20px', marginTop: '10px' }}
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Alert variant="success" className="mt-3">
                  Thank you for contacting me! I have received your message and
                  will get back to you as soon as possible.
                </Alert>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}