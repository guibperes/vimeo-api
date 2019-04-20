import React, { Component } from 'react'
import { Typography, Button } from '@material-ui/core'

import './style.css'
import errorSvg from './error404.svg'

export default class Error404 extends Component {
  render () {
    return (
      <div className='root'>
        <img className='image' src={errorSvg} alt='Error Logo' />
        <Typography id='text' variant='overline' color='inherit'>O que você está procurando não está aqui...</Typography>
        <Button variant='contained' color='primary' href='/'>Voltar</Button>
      </div>
    )
  }
}
