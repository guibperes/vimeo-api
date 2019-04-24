import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

import './style.css'

export default class Header extends Component {
  render () {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography className='grow' variant='title' color='inherit'>Vimeo API</Typography>
            <Link className='link' to='/'><Button color='inherit'>Home</Button></Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
