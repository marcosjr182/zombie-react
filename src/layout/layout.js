import React from 'react';
import Navbar from './navbar';

export default ({children}) =>
	<div className="container card">
		<Navbar />
		{children}
	</div>
