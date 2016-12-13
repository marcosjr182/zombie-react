import React from 'react';

const item_list = ['Water', 'Food', 'Ammunition', 'Medication'];

export default ({Water, Food, Ammunition, Medication}) => {
	<div className="item-list">
  	{ items.map((name, i) => {
  		return (
  			<div key={i} className="col-xs-6 item">
  				<div className="col-xs-12 name">
  					{ name }
  				</div>
  				<div className="col-xs-12 qty">
  					{ [name] || 0 }
  				</div>
  			</div>
  		);
  	}) }
  </div>
}
