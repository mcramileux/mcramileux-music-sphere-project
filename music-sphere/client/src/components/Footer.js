import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className='footer mt-auto py-3 bg-dark text-info'>
      <Container className='container-footer text-center'>
        <Row>
          <Col>
            <div className='social-icons'>
              <a
                href='https://github.com/mcramileux/'
                target='_blank'
                className='text-info'
                rel='noopener noreferrer'
              >
                <AiFillGithub />
              </a>
              <a
                href='https://www.linkedin.com/in/mcramileux/'
                target='_blank'
                className='text-info'
                rel='noopener noreferrer'
              >
                <AiFillLinkedin />
              </a>
              <a
                href='https://twitter.com/mcramileux'
                target='_blank'
                className='text-info'
                rel='noopener noreferrer'
              >
                <AiFillTwitterCircle />
              </a>
            </div>
            <section className='footer'>
              
              <p>
                <h5 className='copyright-text'>
                  &copy; 2023 mcramileux. All rights reserved.
                </h5>
              </p>
            </section>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;