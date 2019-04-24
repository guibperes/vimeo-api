import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'

import './style.css'
import errorSvg from './error404.svg'

export default class Error404 extends Component {
  render () {
    return (
      <div className='root'>
        <img className='image' src={errorSvg} alt='Error Logo' />
        <Typography id='text' variant='overline' color='inherit'>O que você está procurando não está aqui...</Typography>
        <Link className='link' to='/'><Button variant='contained' color='primary'>Voltar</Button></Link>
      </div>
    )
  }
}
