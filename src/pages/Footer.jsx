import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


library.add(faGithub, faLinkedin, faTwitter, faEnvelope);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-customRedOrange py-4">
      <div className="mx-auto flex flex-col items-center md:flex-row justify-center md:items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-center">
          <h4 className="text-lg lg:text-xl font-bold  mb-2">Get Social with Us:</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a 
              href="https://github.com/Lakhan027/updateChatApp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 cursor-pointer text-sm md:text-2xl w-10 h-10 flex items-center justify-center"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
            <a 
              href="https://www.linkedin.com/in/lakhan-sharma-2897841ba/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 cursor-pointer text-sm md:text-2xl w-10 h-10 flex items-center justify-center md:pl-8"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 cursor-pointer text-sm md:text-2xl w-10 h-10 flex items-center justify-center md:pl-10"
              aria-label="Twitter"
            >
               <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
