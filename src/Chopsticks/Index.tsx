import "./index.css";
import React, { useState, useEffect } from "react";
import "./interface.tsx";
import Player from "./Player.tsx";

const Chopsticks: React.FC = () => {
  const [stateholder, setState] = useState<PlayerState[]>([
    {
      player: 1,
      hand1: 1,
      hand2: 1,
      turn: true,
      myHand: null,
      isButtonClicked1: false,
      isButtonClicked2: false,
      switchCombo: [[1, 1]],
    },
    {
      player: 2,
      hand1: 1,
      hand2: 1,
      turn: false,
      myHand: null,
      isButtonClicked1: false,
      isButtonClicked2: false,
      switchCombo: [[1, 1]],
    },
  ]);

  const updateSwitchHand = (switchValue: number[], player: number) => {
    let hand1 = switchValue[0];
    let hand2 = switchValue[1];

    setState((prevState) =>
      prevState.map((playerState) =>
        playerState.player === player
          ? {
              ...playerState,
              hand1: hand1,
              hand2: hand2,
              turn: false,
              myHand: null,
              isButtonClicked1: false,
              isButtonClicked2: false,
            }
          : { ...playerState, turn: true }
      )
    );
  };

  useEffect(() => {
    if (stateholder[0].hand1 === 0 && stateholder[0].hand2 === 0) {
      window.alert("player2 Won");
    }
    if (stateholder[1].hand1 === 0 && stateholder[1].hand2 === 0) {
      window.alert("player1 Won");
    }
  }, [stateholder[0].turn]);

  const updateSwitchCombo = (
    switchCombo: [number, number][],
    player: number
  ) => {
    setState((prevState) =>
      prevState.map((playerState) =>
        playerState.player === player
          ? {
              ...playerState,
              switchCombo: switchCombo,
            }
          : playerState
      )
    );
  };

  const chooseHand = (myHand: number, player: number) => {
    setState((prevState) =>
      prevState.map((playerState) =>
        playerState.player === player
          ? {
              ...playerState,
              myHand: myHand,
              isButtonClicked1: myHand === 1 ? true : false,
              isButtonClicked2: myHand === 2 ? true : false,
            }
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
          if (targetHand === 1) {
            return {
              ...playerState,
              hand1:
                playerState.hand1 + tempHand1! > 5
                  ? 0
                  : playerState.hand1 + tempHand1!,
              turn: true,
            };
          } else if (targetHand === 2) {
            return {
              ...playerState,
              hand2:
                playerState.hand2 + tempHand1! > 5
                  ? 0
                  : playerState.hand2 + tempHand1!,
              turn: true,
            };
          }
        }

        return {
          ...playerState,
          turn: false,
          myHand: null,
          isButtonClicked1: false,
          isButtonClicked2: false,
        };
      })
    );
  };

  return (
    <div className="layout">
      <h1 className="player">player 1</h1>
      <Player
        stateholder={stateholder[0]}
        myHandUpdate={chooseHand}
        targetHandUpdate={slapHand}
        switchUpdate={updateSwitchCombo}
        opponentHands={[stateholder[1].hand1, stateholder[1].hand2]}
        updateSwitchHand={updateSwitchHand}
      />
      <h1 className="player">player 2</h1>
      <Player
        stateholder={stateholder[1]}
        myHandUpdate={chooseHand}
        targetHandUpdate={slapHand}
        switchUpdate={updateSwitchCombo}
        opponentHands={[stateholder[0].hand1, stateholder[0].hand2]}
        updateSwitchHand={updateSwitchHand}
      />
    </div>
  );
};

export default Chopsticks;
