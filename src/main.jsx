import React from 'react'
import ReactDOM from 'react-dom/client'
import StepSlider from './StepSlider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StepSlider
  headerText={'Select Value:'}
  initialValue={0}
  minValue={0}
  maxValue={100}
  stepValue={15}
  showMinMaxDisplay = {true}
  showSelectedValueDisplay = {true}
  showHelpIcon = {true}
  showAsAmount = {true}
/>
  </React.StrictMode>,
)
