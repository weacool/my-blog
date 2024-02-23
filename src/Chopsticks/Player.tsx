import Hand from "./Hand.tsx";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

const Player: React.FC<PlayerProps> = ({
  stateholder,
  myHandUpdate,
  targetHandUpdate,
  switchUpdate,
  opponentHands,
  updateSwitchHand,
  playerid,
}) => {
  const player = stateholder;

  useEffect(() => {
    if (player.turn === true) {
      let switchArray = switchArr();
      switchUpdate(switchArray, player.player);
    }
  }, [player.turn]); // Only run the effect when 'turn' changes in the first item

  useEffect(() => {
    if (player.turn === true) {
      let switchArray = switchArr();
      switchUpdate(switchArray, player.player);
    }
  }, []);

  const switchArr = () => {
    const combinations: [number, number][] = [];
    let total = player.hand1 + player.hand2;
    for (let i = 0; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
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
      {player.turn && player.player === playerid ? (
        <div>
          <div className="handturncontainer1">
            <Typography variant="h4" sx={{ marginTop: "20px" }}>
              My turn
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: "20px", marginBottom: "10px" }}
            >
              Pick your Hand
            </Typography>
            <div className="handbuttoncontainer">
              {showButton1() && (
                <button
                  className={`round-button ${player.isButtonClicked1 ? "highlighted" : ""}`}
                  onClick={() => handleMyHandClick(1)}
                >
                  Hand 1
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
            <Typography
              variant="body1"
              sx={{ marginTop: "25px", marginBottom: "10px" }}
            >
              Target an Opponent's hand
            </Typography>
            <div className="handbuttoncontainer">
              {showButton3() && (
                <button
                  className="round-button"
                  onClick={() => handleTargetHandClick(1)}
                >
                  Opponent's Hand 1
                </button>
              )}
              {showButton4() && (
                <button
                  className="round-button"
                  onClick={() => handleTargetHandClick(2)}
                >
                  Opponent's Hand 2
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {!player.turn && player.player === playerid && (
        <div>
          <div className="waiting-text">
            <Typography variant="body1">
              Waiting for Other Player's turn ...
            </Typography>
          </div>
        </div>
      )}
      <div className="image-container1">
        <Hand handProp={player.hand1} />
        <Hand handProp={player.hand2} />
      </div>
      <ul>
        {player.turn &&
          player.player === playerid &&
          player.switchCombo.map((buttonValues, index) => (
            <List key={index}>
              <div className="switchbutton">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleSwitchClick(buttonValues)}
                >
                  {buttonValues[0] + " , " + buttonValues[1]}
                </Button>
              </div>
            </List>
          ))}
      </ul>
    </div>
  );
};
export default Player;
