import React from 'react'
import { Link } from 'react-router'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import HeaderContent from './HeaderContent'
import ListBox from './ListBox'
import Mask from './Mask'
import Edit from './Edit'
import Add from './Add'
import Detail from './Detail'

console.log("App.js work")

export default React.createClass({
  render() {
    return (
      <div>
        <HeaderContent />
        <Mask />
        <div className="container" >
            <ListBox />
            <Edit />
            <Add />
            <Detail />
        </div> 
      </div>
    )
  }
})
