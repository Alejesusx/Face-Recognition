import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <h2 className='f3 center'>
        {'Put a link to a image here to detect a face on it!'}
      </h2>
      <div className='center'>
        <div className='form w-60 center br3 shadow-4 pa4'>
          <input className='f4 pa2 w-50' onChange={onInputChange}></input>
          <button
            className='f5 br2 w-20 f4 b link ph3 pv2 dib  backgroundButton'
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm
