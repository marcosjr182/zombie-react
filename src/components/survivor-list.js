import React from 'react'
import SurvivorCard from './survivor-card'

const listSurvivors = (survivors) =>
  survivors.map((survivor) =>
    <SurvivorCard id={survivor.id} key={survivor.id} />
  )

export default ({ survivors }) =>
  (survivors.length < 1)
    ? <div className='col-xs-12 loading'> Loading... </div>
    : listSurvivors(survivors)
