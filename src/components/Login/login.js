import React, { Component } from 'react'
import Message from '../Message/Message'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginEmail: '',
      loginPassword: '',
      error: false,
    }
  }

  onEmailChange = (event) => {
    this.setState({ loginEmail: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ loginPassword: event.target.value })
  }

  onSubmitLogin = () => {
    fetch('https://murmuring-castle-43890.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.setState({ error: false })
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        } else {
          this.props.onRouteChange('signin')
          this.setState({ error: true })
        }
      })
      .catch((err) => {
        this.setState({ error: true })
      })
  }

  render() {
    const { onRouteChange } = this.props
    return (
      <>
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-35-l mw6 shadow-5 center formColor'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3 '>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba br2 bg-transparent hover-bg-black  w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b br2 pa2 input-reset ba bg-transparent hover-bg-black  w-100'
                  type='password'
                  name='password'
                  id='password'
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                className='b br2 ph3 pv2 input-reset ba b--black grow pointer f6 dib backgroundButton'
                type='submit'
                value='Sign in'
                onClick={this.onSubmitLogin}
              />
            </div>
            <div className='lh-copy mt3'>
              <p
                onClick={() => onRouteChange('register')}
                className='f6 link dim black db  pointer'
              >
                Or you can register here!
              </p>
            </div>
          </div>
        </main>
      </article>
      {this.state.error && (
        <div className=' w-50-m w-35-l center'>
        <Message  variant='danger'> Error logging in, invalid data</Message>
      </div>
      )}
      </>
    )
  }
}

export default Login
