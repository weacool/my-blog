import Hand from "./Hand.tsx";
import { useEffect } from "react";

const Player: React.FC<PlayerProps> = ({
  stateholder,
  myHandUpdate,
  targetHandUpdate,
  switchUpdate,
  opponentHands,
  updateSwitchHand,
}) => {
  const player = stateholder;

  useEffect(() => {
    if (player.turn === true) {
      let switchArray = switchArr();
      switchUpdate(switchArray, player.player);
    }
  }, [player.turn]); // Only run the effect when 'turn' changes in the first item

  const switchArr = () => {
    const combinations: [number, number][] = [];
    let total = player.hand1 + player.hand2;
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        if (i !== player.hand1 && i + j === total && j !== player.hand2) {
          combinations.push([i, j]);
        }
      }
    }
    return combinations;
  };

  const handleMyHandClick = (myHand: number) => {
    myHandUpdate(myHand, player.player);
  };

  const handleTargetHandClick = (targetHand: number) => {
    if (player.myHand !== null) {
      targetHandUpdate(targetHand, player.player);
    }
  };

  const showButton1 = () => {
    if (player.hand1 !== 0) {
      return true;
    }
  };

  const showButton2 = () => {
    if (player.hand2 !== 0) {
      return true;
    }
  };

  const showButton3 = () => {
    if (opponentHands[0] !== 0) {
      return true;
    }
  };

  const showButton4 = () => {
    if (opponentHands[1] !== 0) {
      return true;
    }
  };

  const handleSwitchClick = (buttonValues: number[]) => {
    updateSwitchHand(buttonValues, player.player);
  };

  return (
    <div className="layout2">
      {player.turn ? (
        <div>
          <div className="handturncontainer1">
            <h1>My turn</h1>
            <p>Pick your hand</p>
            <div className="handbuttoncontainer">
              {showButton1() && (
                <button
                  className={`round-button ${player.isButtonClicked1 ? "highlighted" : ""}`}
                  onClick={() => handleMyHandClick(1)}
                >
                  hand 1
                </button>
              )}
              {showButton2() && (
                <button
                  className={`round-button ${player.isButtonClicked2 ? "highlighted" : ""}`}
                  onClick={() => handleMyHandClick(2)}
                >
                  Hand 2
                </button>
              )}
            </div>
            <p>Target an Opponent's hand</p>
            <div className="handbuttoncontainer">
              {showButton3() && (
                <button
                  className="round-button"
                  onClick={() => handleTargetHandClick(1)}
                >
                  Opponent's hand 1
                </button>
              )}
              {showButton4() && (
                <button
                  className="round-button"
                  onClick={() => handleTargetHandClick(2)}
                >
                  Opponent's hand 2
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="image-container1">
        <Hand handProp={player.hand1} />
        <Hand handProp={player.hand2} />
      </div>
      <ul>
        {player.turn &&
          player.switchCombo.map((buttonValues, index) => (
            <li key={index}>
              <button onClick={() => handleSwitchClick(buttonValues)}>
                {buttonValues}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Player;
