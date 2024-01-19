import './index.css'
import React, { useState } from 'react';


interface PlayerState {
    player: number;
    hand1: number;
    hand2: number;
    turn: boolean;
    myHand: number;

}

interface PlayerProps {
    stateholder: PlayerState;
    myHandUpdate: (myHand: number, player: number) => void;
    targetHandUpdate: (targetHand: number, player: number) => void;
}

const Chopsticks: React.FC = () => {

    const [stateholder, setState] = useState<PlayerState[]>([
      { player: 1, hand1: 2, hand2: 3, turn: true, myHand: 1},
      { player: 2, hand1: 2, hand2: 1, turn: false, myHand: 1}
    ]);
    

    const chooseHand = (myHand: number, player: number) => {
        setState((prevState) =>
    prevState.map((playerState) =>
      playerState.player === player
        ? { ...playerState, myHand: myHand }
        : playerState
    )
  );

    };

    const slapHand = (targetHand: number, player: number) => {
        setState((prevState) =>
          prevState.map((playerState) => {
            if (playerState.player !== player) {
              const otherPlayer = prevState.find((p) => p.player === player);
      
              let tempHand1;

              if (otherPlayer!.myHand === 1 && otherPlayer) {
                tempHand1 = otherPlayer.hand1;
              } else if (otherPlayer!.myHand === 2 && otherPlayer) {
                tempHand1 = otherPlayer.hand2;
              }
              console.log('otherplayer1', otherPlayer!.hand1);
              console.log('otherplayer2', otherPlayer!.hand2);
              console.log('tempHand1', tempHand1)
              if (targetHand === 1) {
                return {
                  ...playerState,
                  hand1: playerState.hand1 + tempHand1!,
                  turn: true
                };
              } else if (targetHand === 2) {
                return {
                    ...playerState,
                    hand2: playerState.hand2 + tempHand1!,
                    turn: true
                  };
              }
            }
      
            return playerState;
          })
        );
      };

      React.useEffect(() => {
        console.log(stateholder); // Log the updated state
      }, [stateholder]);

    
  
      
  
      return (
          <div>
            
            <h1>player 1</h1>
             <Player stateholder = {stateholder[0]} myHandUpdate = {chooseHand} targetHandUpdate = {slapHand}/>
             <h1>player 2</h1>
             <Player stateholder = {stateholder[1]} myHandUpdate = {chooseHand} targetHandUpdate = {slapHand}/>
          </div>
        
      );
  
      
  
  };


const Player: React.FC<PlayerProps> = ({stateholder, myHandUpdate, targetHandUpdate}) => {
    const player = stateholder;

    const handleMyHandClick = (myHand: number) => {

        myHandUpdate(myHand, player.player);

      };

    const handleTargetHandClick = (targetHand: number) => {

        targetHandUpdate(targetHand, player.player)
    }
  
    return (
        <div>
            {player.turn ? (
                <div>
                <p>my turn</p>
                <button onClick = {() => handleMyHandClick(1)}>
                myHand
                </button>
                <button onClick = {() => handleMyHandClick(2)}>
                myHand2
            </button>
            <button onClick = {() => handleTargetHandClick(1)}>
                targetHand1
            </button>
            <button onClick = {() => handleTargetHandClick(2)}>
                targetHand2
            </button>

                </div>
            ):<></>}

            <div className = 'image-container1'>
                <Hand handProp = {player.hand1}/>
                <Hand handProp = {player.hand2}/>
            </div>
        </div>
         
        
    );

      }



const Hand: React.FC<{ handProp: number }> = ({handProp}) => {
    
  const fingerMap: Record<number, string> = {
    1: '/finger1.png',
    2: '/finger2.png',
    3: '/finger3.png',
    4: '/finger4.png',
    5: '/finger5.png',
  };


    return (
        <div>
        <img src = {fingerMap[handProp]} />
        </div>
       
      
    );
 
}


/*
const [fingerCount1, setFingerCount1] = useState(1);
    const [fingerCount2, setFingerCount2] = useState(1);

        const handleFingerClick = (fingerNumber:  number) => {
        if (fingerNumber === 1) {
            setFingerCount1((prevCount) => prevCount + fingerCount2);
        } else if (fingerNumber === 2) {
            setFingerCount2((prevCount) => prevCount + fingerCount1);
    }*/


export default Chopsticks;