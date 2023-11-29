// Footer.js

import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';

const FooterContainer = styled.footer`
  /* background-color: lightgray; */
  /* color: #fff; */
  /* padding: 20px; */
  margin-top: 1rem;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  text-align: center;
  .copy-right {
    font-weight: bold;
  }
`;

const Footer = () => {
  const currentTheme=useSelector(selectTheme)
  return (
    <FooterContainer>
      <SocialMediaLinks>
        <Link
          to="https://github.com/devendra0009"
          target="main"
          className='link'
        >
          <FaGithub fill={`${currentTheme==='dark'?'white':'black'}`} />
        </Link>

        <Link
          to="https://www.linkedin.com/in/davendra-bedwal-09608b232/"
          target="main"
          className='link'
        >
          <FaLinkedin fill="blue" />
        </Link>
        {/* Add more social media links as needed */}
        <p className="copy-right">© 2023 Davendra bedwal</p>
      </SocialMediaLinks>
      <ContactInfo>devendrabedwal4@gmail.com</ContactInfo>
    </FooterContainer>
  );
};

const SocialMediaLinks = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  .link {
    /* color: #fff; */
    padding-top: 0.2rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactInfo = styled.p`
  font-size: 14px;
  font-weight: lighter;
`;

export default Footer;
