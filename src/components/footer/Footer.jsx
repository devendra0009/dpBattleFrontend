// Footer.js

import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  /* background-color: lightgray; */
  /* color: #fff; */
  /* padding: 20px; */
  margin-top: 1rem;
  padding: 0.1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  text-align: center;

`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2023 Davendra bedwal</p>
      <SocialMediaLinks>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        {/* Add more social media links as needed */}
      </SocialMediaLinks>
      <ContactInfo>devendrabedwal4@gmail.com</ContactInfo>
    </FooterContainer>
  );
};

const SocialMediaLinks = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    /* color: #fff; */
    margin: 0 10px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactInfo = styled.p``;

export default Footer;
