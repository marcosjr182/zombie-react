import React from 'react'
import SurvivorCard from './survivor-card'

const isEmpty = (array) =>
  (array.length < 1)

const listSurvivors = (survivors) =>
  isEmpty(survivors)
    ? <div className='col-xs-12 loading'> Loading... </div>
    : survivors.map((survivor) =>
        <SurvivorCard id={survivor.id} key={survivor.id} />
      )


export default class SurvivorList extends React.Component {
  render () {
    return (<div> { listSurvivors(this.props.survivors) } </div>  )
  }
}
