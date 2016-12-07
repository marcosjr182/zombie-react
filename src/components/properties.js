
import React from 'react';
import jQuery from 'jquery';

export default class Properties extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			id: props.id,
			Water : 0,
			Food: 0,
			Ammunition: 0,
			Medication: 0
		}
	}

	render() {
		var items = ['Water', 'Food', 'Ammunition', 'Medication'];

		return (
			<div className="item-list">
			{ items.map(name => {
				return (
					<div className="col-xs-6 item">
						<div className="col-xs-12 name">
							{ name }
						</div>
						<div className="col-xs-12 qty">
							{ this.state[name] }
						</div>
					</div>
				);
			}) }
			</div>
		);
	}

	_fetchProperties() {
		jQuery.ajax({
			method:'GET',
			url:'http://zssn-backend-example.herokuapp.com/api/people/'+this.state.id+'/properties.json',
			success: (data) => {
				data.map( (item) => {
					this.setState({ [item.item.name]: item.quantity })
				});
			}
		});
	}

	componentWillMount(){
		this._fetchProperties();
	}

}
