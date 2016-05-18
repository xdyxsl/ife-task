import React from 'react'
import { Link } from 'react-router'
import HeaderContent from './HeaderContent'
import List from '../components/List'
import Mask from './Mask'

export default React.createClass({
  render() {
    return (
      <div>
        <HeaderContent/ >
        <div id="container" className="container">
            <List />
        </div>
        <Mask/>
      </div>
    )
  }
})
