import React from 'react';
import Properties from './properties';

export default ({ name, items }) =>
  <div className="col-xs-12 my-stats">
  	<div className="col-xs-5 name"> { name } </div>
  	<div className="col-xs-7">
  		<Properties {...items} />
    </div>
  </div>
