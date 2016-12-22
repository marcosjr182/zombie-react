import React from 'react';
import {Link} from 'react-router';

import Properties from './properties';

const genderName = gender => gender == 'M' ? "MALE" : "FEMALE"
const Distance = ({value}) =>
  value
    ? <div className="col-xs-12 distance">{value}km away</div>
    : null

export default ({ age, gender, items, name, distance, id }) =>
  <Link to={`/survivor/${id}`} className="col-sm-6 col-md-4 card-container">
    <div className="col-xs-12 card survivor-card">
      <div className="col-xs-12 name">
        { name }
      </div>

      <div className="col-xs-12 info">
        { genderName(gender) } | { age }
      </div>

      <Properties items={items} />
      <Distance value={distance} />
    </div>
  </Link>
