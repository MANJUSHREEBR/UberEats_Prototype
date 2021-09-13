/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import './Footer.css';

const Layout = ({
  title = 'Title', description = 'Description', className, children,
}) => (
  <div>
    <footer className="jumbotron" style={{ backgroundColor: 'black' }}>
      <h2>{title}</h2>
      <p className="lead">{description}</p>

    </footer>
    <div className={className}>{children}</div>
  </div>

);

export default Layout;
