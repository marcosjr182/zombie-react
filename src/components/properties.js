import React from 'react';

const Property = ({name, value}) =>
  <div className={`col-xs-6 item ${name}`}>
    <div className="col-xs-12 name"> { name } </div>
    <div className="col-xs-12 qty"> { value } </div>
  </div>

export default ({items}) =>
	<div className="item-list">
    {
      items
        ? Object.keys(items).map( (name, key) =>
          <Property key={key} name={name} value={items[name]} /> )
        : ''
    }
  </div>
