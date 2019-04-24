import React, { Component } from 'react'
import { Fab, Grid, LinearProgress, Typography } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import './style.css'
import vimeo from '../../services/vimeo'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videos: [],
      loading: true
    }
  }

  componentDidMount () {
    vimeo.listAll()
      .then(res => {
        this.setState({
          loading: false,
          videos: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        {this.state.loading && (
          <div>
            <LinearProgress color='secondary' />
          </div>
        )}
        {!this.state.loading && (
          <Grid id='container' container spacing={16} direction='row' justify='space-around' alignItems='center'>
            {this.state.videos.map((video, i) => (
              <Grid key={i} className='item' item xs={3}>
                <iframe title={i} src={`https://player.vimeo.com/video/${video.link.split('/').slice(-1)}`} frameborder='0' allow='fullscreen' />
                <Typography className='title' variant='title' color='inherit'>{video.name}</Typography>
                <div className='description'><Typography variant='body2' color='inherit'>{video.description}</Typography></div>
              </Grid>
            ))}
          </Grid>
        )}
        <Fab className='fabBtn' color='primary' aria-label='Adicionar'><AddIcon /></Fab>
      </div>
    )
  }
}
