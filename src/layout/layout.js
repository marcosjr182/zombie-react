import React from 'react';
import Navbar from './navbar';

export default class Layout extends React.Component {
	render() {
		return (
			<div className="container card">
				<Navbar survivor={undefined} key='navbar' />
      	{this.props.children}
    	</div>
		)
	}
}
