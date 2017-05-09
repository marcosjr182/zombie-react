import React from 'react';
import Navbar from './navbar';

export default ({ children }) =>
  <div className="main">
	  <Navbar />
	  {children}
  </div>
