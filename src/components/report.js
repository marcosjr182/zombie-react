import React from 'react';

export default ({ description, value }) =>
  <div className="col-md-6 card-container">
    <div className="col-md-6 card report">
      <div className="col-md-12 description">
        {description}
      </div>
      <div className="col-md-12 value">
        {value}
      </div>
    </div>
  </div>
