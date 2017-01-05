import React from 'react';

export default ({name, value, columns = 6}) =>
  <div className={`col-xs-${columns} item ${name}`}>
    <div className="col-xs-12 name"> { name } </div>
    <div className="col-xs-12 qty"> { value } </div>
  </div>
