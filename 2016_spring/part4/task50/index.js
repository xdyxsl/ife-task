import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'


import ListPage from './modules/ListPage'
import DetailPage from './modules/DetailPage'
import AddPage from './modules/AddPage'
import EditPage from './modules/EditPage'
import HeaderContent from './modules/HeaderContent'

require('./styles/main.css')

render((
  <Router history={hashHistory}>
    <Route path="/" component={ListPage}/>
    <Route path="/DetailPage" component={DetailPage}/>
    <Route path="/AddPage" component={AddPage}/>
    <Route path="/EditPage" component={EditPage}/>
  </Router>
), document.getElementById('app'))
