import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Modal, Tab, Tabs } from 'react-bootstrap';

import SignUpForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('login');

  const handleTabChange = (selectedTab) => {
    setSelectedTab(selectedTab);
  };

  return (
    <>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Music Sphere
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/'>
                Search For Albums
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Favorite Albums
                  </Nav.Link>
                  <Button variant='outline-light' onClick={Auth.logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant='outline-light' onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <Tabs
            activeKey={selectedTab}
            onSelect={handleTabChange}
            variant='pills'
            className='mb-3'
          >
            <Tab eventKey='login' title='Login'>
              <LoginForm handleModalClose={() => setShowModal(false)} />
            </Tab>
            <Tab eventKey='signup' title='Sign Up'>
              <SignUpForm handleModalClose={() => setShowModal(false)} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
