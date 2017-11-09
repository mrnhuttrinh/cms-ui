import React from 'react';

import './index.css';

const NotFound = () => {
  return (
    <div className="error_page_box">
      <h1>This page has gone off the grid.</h1>
      <div className="error_page_inner_box">
        <span className="error_page_span_desktop">
          <a>404</a>
          <p>Page cannot be found</p>
        </span>
        <span className="error_page_span_mobile">
          <a>404 | Page cannot be found<p></p>
        </a></span>
        <a href="/">Go Home</a>
      </div>
    </div>
  );
};

export default NotFound;
