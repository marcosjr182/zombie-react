import React from 'react';
import { Link } from 'react-router';
import Navbar from './navbar';

export default class Layout extends React.Component {
	render() {
		return (
			<div className="container card">
				<Navbar survivor={undefined} />
      	{this.props.children}
    	</div>
		)
	}
}
