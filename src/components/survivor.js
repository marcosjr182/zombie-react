
import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

export default class Survivor extends React.Component {
	

	constructor(props){
		super(props);

		this.id = props.location.split('/').pop();
		this.state = {
			Water : 0,
			Food: 0,
			Ammunition: 0,
			Medication: 0
		}
	}
 
	render() {
		/* Survivor's properties */
		var items = ['Water', 'Food', 'Ammunition', 'Medication'],
				properties = items.map(name => { return this._renderProperty(name) });

		return (
			<div className="col-md-3 card-container">
				<div className="col-md-12 card survivor-card">
					<div className="col-xs-12 name">{ this.props.name }</div>
					<div className="col-xs-12 properties">{ properties }</div>
					<div className="col-md-12 distance">
						5 km away
					</div>
				</div>
			</div>
		);
	}

	_fetchProperties() {
		jQuery.ajax({
			method:'GET',
			url:'http://zssn-backend-example.herokuapp.com/api/people/'+this.id+'/properties.json',
			success: (data) => {
				data.map( (item) => {
					this.setState({ [item.item.name]: item.quantity }) 
				});
			}
		});
	}

	_renderProperty(name) {
		return(
			<div className="col-xs-6 item">
				<div className="col-xs-12 name"> { name } </div>
				<div className="col-xs-12 qty"> { this.state[name] } </div>
			</div>
		);		
	}

	componentWillMount(){
		this._fetchProperties();
	}

}
