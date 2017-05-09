import React from 'react'
import style from './loading.scss'

const Loading = () =>
  <div styleName="spinner">
    <div styleName="bouncers bounce1"></div>
    <div styleName="bouncers bounce2"></div>
    <div styleName="bouncers"></div>
  </div>

export default Loading;
