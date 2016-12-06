import React from 'react';
import { Link } from 'react-router';
import MyStats from '../components/my-stats';

export default class Navbar extends React.Component {
	render() {
		  var customNav = function() {
			//if (true)
			// return (
			//
			// );
			// else {
			// 	return ( <MyStats survivor={undefined} /> );
			// }
		}

		return (
			<div className="col-xs-12 navbar">
				<div className="col-sm-12 text-right">
					<Link className="btn btn-default btn-navbar">Sign In</Link>
					<Link className="btn btn-default btn-navbar">New Survivor</Link>
				</div>
				{ customNav }
			</div>
		)
	}
}
