import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import 'tachyons';

const particleOptions = {
    particles: {
      number: {
        value:40,
        density: {enable: true, value_area: 800}
      }, color: "#000",
      line_linked: { color: "#000", opacity: 0.8, distance: 250,
        shadow: {
          enable: true,
          color: "#000",
          blur: 1
        }}
    }
}

function App() {
  return (
    <div className="App">
    <Particles className="particles" 
        params={particleOptions} />
    <Navigation/>
    <Logo/>
    <Rank/>
    <ImageLinkForm/>
    {/*<FaceRecognition/>*/} 
    </div>
  );
}

export default App;
