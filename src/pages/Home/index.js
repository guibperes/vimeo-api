import React, { Component } from 'react'
import { Fab, Grid, LinearProgress, Typography, Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import './style.css'
import vimeo from '../../services/vimeo'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videos: [],
      loading: true,
      uploadNome: '',
      uploadDesc: '',
      dialog: false,
      uploading: false
    }
    this.fileInputRef = React.createRef()
    this.listAllVideos = this.listAllVideos.bind(this)
    this.uploadVideo = this.uploadVideo.bind(this)
    this.handleDialog = this.handleDialog.bind(this)
    this.handleNomeInput = this.handleNomeInput.bind(this)
    this.handleDescInput = this.handleDescInput.bind(this)
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
    this.setState({ uploading: true })
    let videoData = {
      path: this.fileInputRef.current.files[0],
      name: this.state.uploadNome,
      description: this.state.uploadDesc
    }
    vimeo.upload(videoData)
      .then(() => {
        this.setState({ uploadNome: '', uploadDesc: '', uploading: false })
        this.handleDialog(false)
        this.listAllVideos()
      })
  }

  handleDialog (state) {
    this.setState({ dialog: state, uploadNome: '', uploadDesc: '' })
  }

  handleNomeInput (e) {
    this.setState({ uploadNome: e.target.value })
  }

  handleDescInput (e) {
    this.setState({ uploadDesc: e.target.value })
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
                {video.upload.status === 'complete' ? (
                  <iframe className='frame' title={i} src={`https://player.vimeo.com/video/${video.link.split('/').slice(-1)}`} frameBorder='0' allow='fullscreen' />
                ) : (
                  <div className='frame'><Typography className='sending' variant='title' color='primary'>Processando...</Typography></div>
                )}
                <Typography className='title' variant='title' color='inherit'>{video.name}</Typography>
                <div className='description'><Typography variant='body2' color='inherit'>{video.description}</Typography></div>
              </Grid>
            ))}
          </Grid>
        )}
        <Fab className='fabBtn' color='primary' onClick={() => { this.handleDialog(true) }}><AddIcon /></Fab>
        <Dialog open={this.state.dialog} onClose={() => { this.handleDialog(false) }}>
          <DialogTitle>Enviar Vídeo</DialogTitle>
          <DialogContent>
            <TextField value={this.state.uploadNome} onChange={this.handleNomeInput} margin='normal' label='Nome' type='text' fullWidth autoFocus />
            <TextField value={this.state.uploadDesc} onChange={this.handleDescInput} margin='normal' label='Descrição' type='text' fullWidth />
            <input ref={this.fileInputRef} type='file' />
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={() => { this.handleDialog(false) }}>Fechar</Button>
            <Button color='primary' variant='contained' onClick={() => { this.uploadVideo() }}>{!this.state.uploading ? 'Enviar' : 'Enviando...'}</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
