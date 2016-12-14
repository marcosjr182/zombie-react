import React from 'react';
import {Link} from 'react-router';

import Properties from './properties';

const genderName = gender => gender == 'M' ? "MALE" : "FEMALE"

const Distance = ({value}) =>
  value
    ? <div className="col-md-12 distance">{value} away</div>
    : null

export default ({id, name, gender, age, items, lastSeen, distance}) =>
  <div className="col-md-4 card-container">
  	<Link to={`/survivor/${id}`}>
  		<div className="col-md-12 card survivor-card">
  			<div className="col-xs-12 name">
  				{ name }
  			</div>

  			<div className="col-xs-12 info">
  				{ genderName(gender) } | { age }
  			</div>

  			<Properties {...items} />
        <Distance value={distance} />
      </div>
    </Link>
  </div>
