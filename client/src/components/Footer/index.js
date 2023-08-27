// all good - do not change
import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-dark text-light p-4">
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