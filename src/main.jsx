import React from 'react'
import ReactDOM from 'react-dom/client'
import StepSlider from './StepSlider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StepSlider
  headerText={'Select Value:'}
  headerIcon={'insert icon'}
  initialValue={0}
  minValue={0}
  maxValue={100}
  stepValue={15}
  leftBoundary={0.15}
  rightBoundary={0.85}
  marks={[
    { value: 14000, label: '₹14,000' },
    { value: 15000, label: '₹15,000' },
    { value: 16000, label: '₹16,000' },
    { value: 17000, label: '₹17,000' },
    { value: 18000, label: '₹18,000' },
  ]}
/>
  </React.StrictMode>,
)
