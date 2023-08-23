// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

// // import SignUpForm from '../components/SignupForm';
// // import LoginForm from '../components/LoginForm';

// // import Auth from '../utils/auth';

// // const AppNavbar = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   // const [selectedTab, setSelectedTab] = useState('login');

// //   // const handleTabChange = (selectedTab) => {
// //   //   setSelectedTab(selectedTab);
// //   // };

// //   return (
// //     <>
// //        <Navbar bg='dark' variant='dark' expand='lg'>
// //         <Container fluid>
// //           <Navbar.Brand as={Link} to='/'>
// //             MusicSphere
// //           </Navbar.Brand>
// //           <Navbar.Toggle aria-controls='navbar' />
// //           <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
// //             <Nav className='ml-auto d-flex'>
// //               <Nav.Link as={Link} to='/'>
// //                 Search For Albums
// //               </Nav.Link>
// //               {/* if user is logged in show saved albums and logout */}
// //               {Auth.loggedIn() ? (
// //                 <>
// //                   <Nav.Link as={Link} to='/saved'>
// //                     See Your Favorite
// //                   </Nav.Link>
// //                   <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
// //                 </>
// //               ) : (
// //                 <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
// //               )}
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>
// //       {/* set modal data up */}
// //       <Modal
// //         size='lg'
// //         show={showModal}
// //         onHide={() => setShowModal(false)}
// //         aria-labelledby='signup-modal'>
// //         {/* tab container to do either signup or login component */}
// //         <Tab.Container defaultActiveKey='login'>
// //           <Modal.Header closeButton>
// //             <Modal.Title id='signup-modal'>
// //               <Nav variant='pills'>
// //                 <Nav.Item>
// //                   <Nav.Link eventKey='login'>Login</Nav.Link>
// //                 </Nav.Item>
// //                 <Nav.Item>
// //                   <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
// //                 </Nav.Item>
// //               </Nav>
// //             </Modal.Title>
// //           </Modal.Header>
// //           <Modal.Body>
// //             <Tab.Content>
// //               <Tab.Pane eventKey='login'>
// //                 <LoginForm handleModalClose={() => setShowModal(false)} />
// //               </Tab.Pane>
// //               <Tab.Pane eventKey='signup'>
// //                 <SignUpForm handleModalClose={() => setShowModal(false)} />
// //               </Tab.Pane>
// //             </Tab.Content>
// //           </Modal.Body>
// //         </Tab.Container>
// //       </Modal>
// //     </>
// //   );
// // };

// // export default AppNavbar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import Auth from '../utils/auth';

// const AppNavbar = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/">
//             MusicSphere
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbar"
//             aria-controls="navbar"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbar">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/">
//                   Search For Albums
//                 </Link>
//               </li>
//               {Auth.loggedIn() ? (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/saved">
//                       See Your Favorite
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <button className="btn btn-link nav-link" onClick={Auth.logout}>
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li className="nav-item">
//                   <button className="btn btn-link nav-link" onClick={() => setShowModal(true)}>
//                     Login/Sign Up
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog">
//         <div className="modal-dialog modal-lg" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <ul className="nav nav-pills" id="signup-modal" role="tablist">
//                 <li className="nav-item">
//                   <a className={`nav-link ${showModal ? 'active' : ''}`} id="login-tab" data-bs-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">
//                     Login
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className={`nav-link ${!showModal ? 'active' : ''}`} id="signup-tab" data-bs-toggle="tab" href="#signup" role="tab" aria-controls="signup" aria-selected="false">
//                     Sign Up
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="modal-body">
//               <div className="tab-content">
//                 <div className={`tab-pane fade ${showModal ? 'show active' : ''}`} id="login" role="tabpanel" aria-labelledby="login-tab">
//                   {/* Render your LoginForm component here */}
//                 </div>
//                 <div className={`tab-pane fade ${!showModal ? 'show active' : ''}`} id="signup" role="tabpanel" aria-labelledby="signup-tab">
//                   {/* Render your SignUpForm component here */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AppNavbar;
