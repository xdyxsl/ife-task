import React from 'react'
import ReactDOM from 'react'
import redner from 'react'
import {HeaderContent} from './all.js'

var App =  document.getElementById("app")

render(
    <div>
      <HeaderContent />
      <div id='container' className='container'>
      // <ListBox />
      </div>
    </div>,
    App
)