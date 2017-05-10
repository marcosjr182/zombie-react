import React from 'react'
import SurvivorCard from './survivor-card'
import Loading from './layout/loading'

const listSurvivors = (survivors) =>
  survivors.map((survivor) =>
    <SurvivorCard id={survivor.id} key={survivor.id} />
  )

export default ({ survivors }) =>
  (survivors.length < 1)
    ? <Loading />
    : <div> { listSurvivors(survivors) } </div>
