import React from 'react';

import './Footer.css';

const Footer = () => (
  <footer className="Footer">
    &copy; Jeff Waterfall {(new Date()).getFullYear()}. All rights reserved.
  </footer>
);

export default Footer;
