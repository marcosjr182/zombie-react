import React from 'react';
import { Link } from 'react-router';
import jQuery from 'jquery';
import MyStats from '../components/my-stats';

export default class Navbar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isSigned: (props.mySurvivor != undefined),
			mySurvivor: props.mySurvivor,
			survivorId: ''
		};

		this._signOut = this._signOut.bind(this);
		this._signInSubmit = this._signInSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		const publicNav = () => {
			if (!this.state.isSigned){
				return (
					<div className="col-sm-6 text-right">
						<form className="navbar-form" onSubmit={this._signInSubmit}>
							<input className="form-control" type="text" onChange={this.handleChange} value={this.state.survivorId} />
							<input className="btn btn-default btn-navbar" type="submit" value="Sign In" />
						</form>
						<Link className="btn btn-default btn-navbar">New Survivor</Link>
					</div>
				);
			} else {
				return (
					<div className="col-sm-6 text-right">
						<Link className="btn btn-default btn-navbar" >Update My Location</Link>
						<Link className="btn btn-default btn-navbar" onClick={this._signOut}>Sign Out</Link>
					</div>
				);
			}
		},
		signedUserNav = () => {
			if (this.state.isSigned){
				return ( <MyStats {...this.state.mySurvivor} /> );
			}
		}


		return (
			<div className="col-xs-12 navbar">
				<div className="col-xs-12 col-sm-6"> { signedUserNav() } </div>
				{ publicNav() }
			</div>
		)
	}

	_signInSubmit(){
		jQuery.ajax({
			method: 'GET',
			url: 'http://zssn-backend-example.herokuapp.com/api/people/'+this.state.survivorId+'.json',
			success: (res) => {
				const data = JSON.stringify(res);
				localStorage.setItem('mySurvivor', data);
				this.setState({
					mySurvivor: JSON.parse(data),
					isSigned: true
				});
			}
		});
	}

	_signOut() {
		localStorage.removeItem('mySurvivor');
		this.setState({
			mySurvivor: undefined,
			isSigned: false
		});
	}

	handleChange(event) {
		this.setState({survivorId: event.target.value});
	}

}
