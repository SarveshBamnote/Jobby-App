import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    let {username, password} = this.state

    if (username === 'sarvesh') username = 'rahul'

    if (password === 'sarvesh@2024') password = 'rahul@2021'

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-form-website-logo"
          />
          <div className="login-form-label-input">
            <label className="login-form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="login-form-input"
              value={username}
              onChange={this.onChangeUsername}
              type="text"
              id="username"
              placeholder="sarvesh"
            />
          </div>
          <div className="login-form-label-input">
            <label className="login-form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="login-form-input"
              value={password}
              onChange={this.onChangePassword}
              type="password"
              id="password"
              placeholder="sarvesh@2024"
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="login-error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
