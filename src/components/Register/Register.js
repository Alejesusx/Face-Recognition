import React from 'react'
import Message from '../Message/Message'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerEmail: '',
      registerPassword: '',
      registerName: '',
      error: false,
      msgError: '',
    }
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value })
  }

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value })
  }

  validateEmail = (email) => {
    var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if (email.match(mailformat)) {
      return true
    } else {
      return false
    }
  }

  onSubmitRegister = () => {
    if (
      this.state.registerEmail === '' ||
      this.state.registerName === '' ||
      this.state.registerPassword === ''
    ) {
      this.setState({
        error: true,
        msgError: 'Please enter all the data to complete the register process',
      })
    } else if (this.validateEmail(this.state.registerEmail) === false) {
      this.setState({
        error: true,
        msgError: 'Invalid Email address',
      })
    } else {
      fetch('http://localhost:3333/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.registerEmail,
          password: this.state.registerPassword,
          name: this.state.registerName,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            this.props.loadUser(user)
            this.props.onRouteChange('home')
          }
        })
    }
  }

  render() {
    const { onRouteChange } = this.props
    return (
      <>
        <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-35-l mw6 shadow-5 center formColor'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f2 fw6 ph0 mh0'>Register</legend>
                <div className='mt3 '>
                  <label className='db fw6 lh-copy f6' htmlFor='name'>
                    Name
                  </label>
                  <input
                    className='pa2 input-reset ba br2 bg-transparent hover-bg-black w-100'
                    type='text'
                    name='name'
                    id='name'
                    onChange={this.onNameChange}
                  />
                </div>
                <div className='mt3 '>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    className='pa2 input-reset ba br2 bg-transparent hover-bg-black  w-100'
                    type='email'
                    placeholder='email@example.com'
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
                  value='Register'
                  onClick={this.onSubmitRegister}
                />
              </div>
              <div className='lh-copy mt3'>
                <p
                  onClick={() => onRouteChange('signin')}
                  className='f6 link dim black db pointer'
                >
                  Already have an account? Sign in
                </p>
              </div>
            </div>
          </main>
        </article>
        {this.state.error && (
          <div className=' w-50-m w-35-l center'>
            <Message variant='danger'> {this.state.msgError}</Message>
          </div>
        )}
      </>
    )
  }
}

export default Register
