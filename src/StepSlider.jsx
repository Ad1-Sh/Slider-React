import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';


const SliderContainer = styled.div`
  color: #213547;
  width: 100%;
  position: relative;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: hidden;
  touch-action: manipulation;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  user-select: none;
`;

const InfoIcon = styled.span`
  cursor: pointer;
  font-size: 0.9em;
  user-select: none;
`;

const SliderValueDisplay = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  padding: 10px;
  user-select: none;
`;

const SliderValues = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  user-select: none;
`;

const CustomSlider = styled.div`
  width: calc(100% - 40px);
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  margin: 0 auto;
  max-width: 300px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ value, minValue, maxValue }) => {
      const range = maxValue - minValue;
      const position = (value - minValue) / range;
      const filledWidth = position < 0.05 ? 0 : position > 0.95 ? 100 : position * 100;
      return filledWidth + '%';
    }};
    background-color: #39b3bd;
    border-radius: 5px;
    transition: width 0.2s ease;
  }
`;

const SliderThumb = styled.div`
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: left 0.2s ease;
  overflow-y: visible;
`;

const SliderToggle = styled.div`

display: flex;
justify-content: center;
position: relative;
border: 1px solid #ccc;
padding: 20px;
max-width: 300px; 
margin: 0 auto;

&::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ value, minValue, maxValue }) => {
    const filledWidth = ((value - minValue) / (maxValue - minValue)) * 100;
    return filledWidth > 100 ? 100 : filledWidth < 0 ? 0 : filledWidth + '%';
  }};
  transition: width 0.2s ease;
`

const StepSlider = ({ initialValue, minValue, maxValue, stepValue, marks, headerText, headerIcon, leftBoundary = 0.05, rightBoundary = 0.95 }) => {
  const [value, setValue] = useState(initialValue);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);

  const handleDrag = (clientX, isClick = false) => {
    if ((!isDragging && !isClick) || !sliderRef.current) return;
    const sliderWidth = sliderRef.current.offsetWidth;
    const newPosition = (clientX - sliderRef.current.getBoundingClientRect().left) / sliderWidth;
    // const steps = Math.round((maxValue - minValue) / stepValue);
    const steps = Math.max(1, Math.round((maxValue - minValue) / stepValue));  // Ensures at least one step

    const stepWidth = 1 / steps;
    let closestStep;
    
    if (isClick) {
      if (newPosition < leftBoundary) {
        closestStep = 0;
      } else if (newPosition > rightBoundary) {
        closestStep = steps;
      } else {
        closestStep = Math.round(newPosition / stepWidth);
      }
    } else {
      closestStep = Math.round(newPosition / stepWidth);
    }
    const newValue = isClick
      ? (newPosition < leftBoundary ? minValue : newPosition > rightBoundary ? maxValue : closestStep * stepValue + minValue)
      : Math.min(maxValue, Math.max(minValue, closestStep * stepValue + minValue));
      setValue(Math.min(maxValue, newValue));
  };
  
  //update
  const handleTouchStartToggle = (event) => {
    handleStartDrag(event.touches[0].clientX);
  };
  
  const handleTouchMoveToggle = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();
      handleDrag(event.touches[0].clientX);
    }
  };
  
  const handleTouchEndToggle = () => {
    handleEndDrag();
  };

  //updateend
  
  const handleStartDrag = (clientX) => {
    setIsDragging(true);
    setTouchStartX(clientX);
    handleDrag(clientX);
  };

  const handleEndDrag = () => {
    setIsDragging(false);
  };

  const handleSliderClick = (event) => {
    handleDrag(event.clientX, true);
  };
  
  const handleTouchMove = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault(); 
      handleDrag(event.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleEndDrag();
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      handleDrag(event.clientX);
    }
  };

  const handleMouseUp = () => {
    handleEndDrag();
  };

  useEffect(() => {
    if (thumbRef.current) {
      thumbRef.current.addEventListener('touchmove', handleTouchMove);
      thumbRef.current.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (thumbRef.current) {
        thumbRef.current.removeEventListener('touchmove', handleTouchMove);
        thumbRef.current.removeEventListener('touchend', handleTouchEnd);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <SliderContainer>
      <SliderHeader>
        <span>{headerText}</span>
        <InfoIcon title="Insert Icon">{headerIcon}</InfoIcon>
      </SliderHeader>
        <SliderValueDisplay>{'₹' + value.toLocaleString()}
        </SliderValueDisplay>
        <SliderToggle 

        ref={sliderRef}
        onMouseDown={(event) => handleStartDrag(event.clientX)}
        onTouchStart={handleTouchStartToggle}
        onTouchMove={handleTouchMoveToggle}
        onTouchEnd={handleTouchEndToggle}
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        onClick={handleSliderClick}

        >
      <CustomSlider
        ref={sliderRef}
        onMouseDown={(event) => handleStartDrag(event.clientX)}
        onTouchStart={(event) => handleStartDrag(event.touches[0].clientX)}
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        onClick={handleSliderClick}>
        <SliderThumb
          ref={thumbRef}
          style={{ left: `${((value - minValue) / (maxValue - minValue)) * 100}%` }}
        />
      </CustomSlider>
      </SliderToggle>
      <SliderValues>
          <span>{marks[0].label}</span>
          <span>{marks[marks.length - 1].label}</span>
        </SliderValues>

    </SliderContainer>
  );
};

export default StepSlider;

