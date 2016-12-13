import React from 'react';
import Properties from './properties';

export default ({ name }) =>
  <div className="col-xs-12 my-stats">
  	<div className="col-xs-5 name"> { name } </div>
  	<div className="col-xs-7">
  		<Properties/>
    </div>
  </div>
