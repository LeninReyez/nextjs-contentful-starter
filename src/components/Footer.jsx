// Footer.js
import React from 'react';
import styled from 'styled-components';

// Styled component for the footer container
const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
`;

// Footer component
const Footer = () => (
  <FooterContainer>
    <p>© 2024 Oak & Pine Bakehouse. All Rights Reserved.</p>
  </FooterContainer>
);

export default Footer;
