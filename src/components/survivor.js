import React from 'react'
import {Link} from 'react-router'
import Properties from './properties'

const genderName = gender => gender == 'M' ? "MALE" : "FEMALE"
const Distance = ({value}) =>
  value
    ? <div className="col-xs-12 distance">{value}km away</div>
    : null

export default ({ age, gender, items, name, distance, className, itemColumns='6' }) =>
  <div className={`col-xs-12 survivor ${className}`} >
    <div className="col-xs-12 name">
      {name}
    </div>

    <div className="col-xs-12 info">
      { genderName(gender) } | { age }
    </div>

    <Properties items={items} columns={itemColumns} />
    <Distance value={distance} />
  </div>
