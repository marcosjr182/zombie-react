import React from 'react'
import style from './button.scss'

export default ({ className = '', onClick, text }) =>
  <button
    onClick={onClick}
    className={className}
    styleName='Button'>
     { text }
  </button>
