import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () =>{
return(
<div>
    <h2 className="f3 center">{'Put an image here and see if it detects a face!'}</h2>
    <div className="center">
        <div className="form w-60 center br3 shadow-4 pa4">
        <input className="f4 pa2 w-50"></input>
        <button className="f5 w-20 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
    </div>
</div>
)
}

export default ImageLinkForm