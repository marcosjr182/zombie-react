import React from 'react';
import Properties from './properties';

const Stats = ({user}) =>
  user
    ? <div className="col-xs-12 my-stats">
        <div className="col-xs-12 col-md-5 name"> { user.name } </div>
        <div className="col-xs-12 col-sm-7">
          <Properties items={user.items} columns='3' />
        </div>
      </div>
    : ''

export default ({ user }) =>
  <div className='col-xs-12 col-sm-8'>
    <Stats user={user} />
  </div>
