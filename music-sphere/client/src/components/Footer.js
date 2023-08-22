import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className='bg-dark text-info'>
      <Container className='text-center'>
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
            <section>
              <p>
                <h6 className='copyright-text'>
                  &copy; 2023 mcramileux. All rights reserved.
                </h6>
              </p>
            </section>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
