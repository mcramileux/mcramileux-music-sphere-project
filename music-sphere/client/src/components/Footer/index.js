// all good - for the mean time
import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

const Footer = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        <div className='social-icons'>
            <a href='https://github.com/mcramileux/' target='_blank'className='text-info'
                rel='noopener noreferrer'>
                <AiFillGithub />
            </a>

            <a href='https://www.linkedin.com/in/mcramileux/' target='_blank' className='text-info'
                rel='noopener noreferrer'>
                <AiFillLinkedin />
            </a>

            <a href='https://twitter.com/mcramileux' target='_blank' className='text-info'
                rel='noopener noreferrer'>
                <AiFillTwitterCircle />
            </a>
          </div>
            <section className='footer'>
              <h5 className='copyright-text'>
                <p>
                  &copy; 2023 mcramileux. All rights reserved.               
                </p>
              </h5>
            </section>   
        </div>
    </footer>
  );
};

export default Footer;


// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

// const Footer = () => {
//   return (
//     <footer className='footer mt-auto py-3 bg-dark text-info'>
//       <Container className='container-footer text-center'>
//         <Row>
//           <Col>
//             <div className='social-icons'>
//               <a
//                 href='https://github.com/mcramileux/'
//                 target='_blank'
//                 className='text-info'
//                 rel='noopener noreferrer'
//               >
//                 <AiFillGithub />
//               </a>
//               <a
//                 href='https://www.linkedin.com/in/mcramileux/'
//                 target='_blank'
//                 className='text-info'
//                 rel='noopener noreferrer'
//               >
//                 <AiFillLinkedin />
//               </a>
//               <a
//                 href='https://twitter.com/mcramileux'
//                 target='_blank'
//                 className='text-info'
//                 rel='noopener noreferrer'
//               >
//                 <AiFillTwitterCircle />
//               </a>
//             </div>
//             <section className='footer'>
              
//               <p>
//                 <h5 className='copyright-text'>
//                   &copy; 2023 mcramileux. All rights reserved.
//                 </h5>
//               </p>
//             </section>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;