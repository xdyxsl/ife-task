import React from 'react'
import { Link } from 'react-router'
import HeaderContent from './HeaderContent'
import Add from '../components/Add'
import Mask from './Mask'

export default React.createClass({
  render() {
    return (
      <div>
        <HeaderContent/ >
        <div id="container" className="container">
            <Add />
        </div>
        <Mask/>
      </div>
    )
  }
})