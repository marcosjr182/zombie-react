import React from 'react'
import Properties from './properties'

import styles from './survivor.scss'

const genderName = gender =>
  <div className="col-xs-12 info">
    { genderName(gender) } | { age }
  </div>

const renderDistance = value =>
  value
    ? <div styleName="distance">{value}km away</div>
    : null

export default ({ age, gender, items, name, distance, className='', itemColumns='6' }) =>
  <div className={`col-xs-12 survivor ${className}`} >
    <div className="col-xs-12 name">
      {name}
    </div>

    <div className="col-xs-12 info">
      { gender || '' } | { age || '' }
    </div>

    <Properties items={items} columns={itemColumns} />
    { renderDistance(distance) }
  </div>
