import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

import './style.css'

export default class Header extends Component {
  render () {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography className='grow' variant='title' color='inherit'>Vimeo API</Typography>
            <Button color='inherit' href='/'>Home</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
