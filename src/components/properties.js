import React from 'react';

const item_list = ['Water', 'Food', 'Ammunition', 'Medication'];

export default ({Water, Food, Ammunition, Medication}) =>
	<div className="item-list">
    { item_list.map((name, i) => {
  		return (
  			<div key={i} className={`col-xs-6 item ${eval(name)}`}>
  				<div className="col-xs-12 name"> { name } </div>
  				<div className="col-xs-12 qty"> { eval(name) } </div>
  			</div>
  		);
  	}) }
  </div>
