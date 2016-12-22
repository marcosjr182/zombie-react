import React from 'react';

const Property = ({name, value, columns = '6'}) =>
  <div className={`col-xs-${columns} item ${name}`}>
    <div className="col-xs-12 name"> { name } </div>
    <div className="col-xs-12 qty"> { value } </div>
  </div>

export default ({items, columns}) =>
  <div className="item-list">
    {
      items
        ? Object.keys(items).map( (name, key) =>
          <Property key={key} columns={columns} name={name} value={items[name]} /> )
        : ''
    }
  </div>
