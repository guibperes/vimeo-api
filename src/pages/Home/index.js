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
      loading: true,
      uploadNome: 'Teste 4',
      uploadDesc: 'api upload'
    }
    this.fileInputRef = React.createRef()
    this.listAllVideos = this.listAllVideos.bind(this)
    this.uploadVideo = this.uploadVideo.bind(this)
  }

  componentDidMount () {
    this.listAllVideos()
  }

  listAllVideos () {
    this.setState({ loading: true })
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

  uploadVideo () {
    let videoData = {
      path: this.fileInputRef.current.files[0],
      name: this.state.uploadNome,
      description: this.state.uploadDesc
    }
    vimeo.upload(videoData)
      .then(() => {
        this.setState({ uploadNome: '', uploadDesc: '' })
        this.listAllVideos()
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
          <Grid id='container' container spacing={8} direction='row' justify='flex-start' alignItems='center'>
            {this.state.videos.map((video, i) => (
              <Grid key={i} className='item' item xs={4}>
                {video.upload.status === 'complete' && (
                  <iframe className='frame' title={i} src={`https://player.vimeo.com/video/${video.link.split('/').slice(-1)}`} frameBorder='0' allow='fullscreen' />
                )}
                {video.upload.status !== 'complete' && (
                  <div className='frame'><Typography className='sending' variant='title' color='primary'>Enviando...</Typography></div>
                )}
                <Typography className='title' variant='title' color='inherit'>{video.name}</Typography>
                <div className='description'><Typography variant='body2' color='inherit'>{video.description}</Typography></div>
              </Grid>
            ))}
          </Grid>
        )}
        <Fab className='fabBtn' color='primary' onClick={() => { this.uploadVideo() }}><AddIcon /></Fab>
        <input ref={this.fileInputRef} type='file' />
      </div>
    )
  }
}
