import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import LogoApp from './LogoApp.png'

const Logo = () =>{
return(
    <div className="ma4 mt0 center">
    <Tilt className="Tilt br3 shadow-2" options={{ max : 40 }} style={{ height: 120, width: 120 }} >
 <div className="Tilt-inner"> <img alt="logo" src={LogoApp}/> </div>
</Tilt>
</div>
)
}

export default Logo