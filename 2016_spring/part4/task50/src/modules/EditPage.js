import React from 'react'
import { Link } from 'react-router'
import HeaderContent from './HeaderContent'
import Edit from '../components/Edit.js'
import Mask from './Mask'

export default React.createClass({
  render() {
    return (
      <div>
        <HeaderContent/ >
        <div id="container" className="container">
            <Edit />
        </div>
        <Mask/>
      </div>
    )
  }
})
