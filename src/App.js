import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import Error404 from './pages/Error404'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='*' component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
