import React from 'react'
import ReactDOM from 'react-dom/client'
import Slider from './Slider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Slider
  minValue={0}
  maxValue={100}
  stepValue={20}
/>
  </React.StrictMode>,
)
