import './index.css'
import { useState } from 'react';

interface FingerProps {
    value: number; 
    fingerMap: Record<string, string>;
    onClick: () => void;
  };

const fingerMap = {
    1: '/finger1.png',
    2: '/finger2.png',
    3: '/finger3.png',
    4: '/finger4.png',
    5: '/finger5.png',
  };




function Finger({value, fingerMap, onClick}: FingerProps) {

    return (
        <button onClick = {onClick}>
        <img src = {fingerMap[value]} />
        </button>
    );
};




const Chopsticks = () => {
    const [fingerCount1, setFingerCount1] = useState(1);
    const [fingerCount2, setFingerCount2] = useState(1);

        const handleFingerClick = (fingerNumber:  number) => {
        if (fingerNumber === 1) {
            setFingerCount1((prevCount) => prevCount + fingerCount2);
        } else if (fingerNumber === 2) {
            setFingerCount2((prevCount) => prevCount + fingerCount1);
    }
  };


    return (
        <div>
            <div className = 'image-container'>

                <Finger value = {fingerCount1} fingerMap = {fingerMap} onClick = {() => handleFingerClick(1)}/>
        
        </div>
        <div className = 'image-container'>

            <Finger value = {fingerCount2} fingerMap = {fingerMap} onClick = {() => handleFingerClick(2)}/>
  
            </div>

        </div>
      
    );

    

};

export default Chopsticks;