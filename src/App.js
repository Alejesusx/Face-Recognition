import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import 'tachyons'
import { Component } from 'react'
import Clarifai from 'clarifai'
import Login from './components/Login/login'
import Register from './components/Register/Register'
import Message from './components/Message/Message'

const app = new Clarifai.App({ apiKey: '63f7c7cb688644fbaddf57eecac02756' })

const particleOptions = {
  particles: {
    number: {
      value: 40,
      density: { enable: true, value_area: 800 },
    },
    color: '#000',
    line_linked: {
      color: '#000',
      opacity: 0.8,
      distance: 250,
      shadow: {
        enable: true,
        color: '#000',
        blur: 1,
      },
    },
  },
}
const initialState = {
  errorimg: false,
  errorimgMsg: '',
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: '',
  },
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    })

    console.log(this.state.user)
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = (event) => {
    if (this.state.input === '') {
      alert('Please enter a link to an image')
    } else {
      this.setState({ imageUrl: this.state.input })
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then((response) => {
          if (response.outputs[0].data.regions) {
            this.displayFaceBox(this.calculateFaceLocation(response))
            fetch('http://localhost:3333/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                )
                this.setState({ errorimg: false, errorimgMsg: '' })
              })
          } else {
            this.setState({
              errorimg: true,
              errorimgMsg: 'Apparently there are no faces in here...',
            })
          }
        })
        .catch((err) => {
          console.log(err)
          this.setState({
            errorimg: true,
            errorimgMsg:
              'There was an error loading the image, try it again with another link to a image',
          })
        })
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particleOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === 'home' ? (
          <>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
              err={this.state.errorimg}
            />
            {this.state.errorimg && (
              <div className=' w-50-m w-35-l center'>
                <Message variant='danger'> {this.state.errorimgMsg}</Message>
              </div>
            )}
          </>
        ) : this.state.route === 'register' ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    )
  }
}

export default App
