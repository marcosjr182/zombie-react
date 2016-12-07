import React from 'react';
import Navbar from './navbar';

export default class Layout extends React.Component {

	constructor(){
		super();
		this.state = {
			mySurvivor: undefined
		}
	}

	componentWillMount() {
		const data = localStorage.getItem('mySurvivor');
		console.log(data);
		if (data != null) this.setState({ mySurvivor: JSON.parse(data) });
	}

	render() {
		return (
			<div className="container card">
				<Navbar mySurvivor={this.state.mySurvivor} />
				{this.props.children}
    	</div>
		)
	}

	_setMySurvivor(survivor) {
		localStorage.setItem('mySurvivor', JSON.stringify(survivor));
	}
}
