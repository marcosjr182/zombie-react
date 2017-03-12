import React from 'react'
import Property from './property'

export default ({items = {}, columns}) =>
  <div className="item-list">
    {
      Object.keys(items).map( (name, key) =>
        <Property key={key} columns={columns} name={name} value={items[name]} /> )
    }
  </div>

Property.displayName = 'Property'
