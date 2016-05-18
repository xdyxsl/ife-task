import React from 'react'
import { Link } from 'react-router'
import HeaderContent from './HeaderContent'
import ListBox from './ListBox'
import Mask from './Mask'

export default React.createClass({
  render() {
    return (
      <div>
        <HeaderContent/ >
        <div id="container" className="container">
            <ListBox/>
        </div>
        <Mask/>
      </div>
    )
  }
})
