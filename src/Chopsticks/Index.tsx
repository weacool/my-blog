import "./index.css";
import React, { useState, useEffect } from "react";
import "./interface.tsx";
import Player from "./Player.tsx";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Chopsticks: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : undefined;
  const [stateholder, setState] = useState<PlayerState[]>([
    {
      player: 1,
      hand1: 1,
      hand2: 1,
      turn: true,
      myHand: null,
      isButtonClicked1: false,
      isButtonClicked2: false,
      switchCombo: [],
    },
    {
      player: 2,
      hand1: 1,
      hand2: 1,
      turn: false,
      myHand: null,
      isButtonClicked1: false,
      isButtonClicked2: false,
      switchCombo: [],
    },
  ]);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    // Set a condition (e.g., whether running in production or not)
    const isProduction = process.env.NODE_ENV === "production";

    // Define the base URL
    const baseURL = isProduction ? "/chopsticksocket" : "http://localhost:5001";

    // Connect to the Socket.IO server
    const socket = io(baseURL, {
      path: "/chopsticksocket",
    });
    setSocket(socket);
    // Event handling
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Listen for 'updateState' event from the server
    socket.on("updateState", (updatedState) => {
      setState(updatedState);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures the effect runs once on component mount

  //socket.emit("sendState", stateholder);

  const updateSwitchHand = (switchValue: number[], player: number) => {
    let hand1 = switchValue[0];
    let hand2 = switchValue[1];

    setState((prevState) => {
      const newState = prevState.map((playerState) =>
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
      );

      if (socket) {
        socket.emit("sendState", newState);
      }
      return newState;
    });
  };

  const updateSwitchCombo = (
    switchCombo: [number, number][],
    player: number
  ) => {
    setState((prevState) => {
      const newState = prevState.map((playerState) =>
        playerState.player === player
          ? {
              ...playerState,
              switchCombo: switchCombo,
            }
          : playerState
      );

      // Emit the updated state to the server if a socket connection exists
      if (socket) {
        socket.emit("sendState", newState);
      }

      return newState;
    });
  };

  const chooseHand = (myHand: number, player: number) => {
    setState((prevState) => {
      const newState = prevState.map((playerState) =>
        playerState.player === player
          ? {
              ...playerState,
              myHand: myHand,
              isButtonClicked1: myHand === 1 ? true : false,
              isButtonClicked2: myHand === 2 ? true : false,
            }
          : playerState
      );
      if (socket) {
        socket.emit("sendState", newState);
      }

      return newState;
    });
  };

  const slapHand = (targetHand: number, player: number) => {
    setState((prevState) => {
      const newState = prevState.map((playerState) => {
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
      });

      // Emit the updated state to the server
      if (socket) {
        socket.emit("sendState", newState);
      }

      return newState; // Return the updated state for React to apply
    });
  };

  const handleReset = () => {
    const initalState = [
      {
        player: 1,
        hand1: 1,
        hand2: 1,
        turn: true,
        myHand: null,
        isButtonClicked1: false,
        isButtonClicked2: false,
        switchCombo: [],
      },
      {
        player: 2,
        hand1: 1,
        hand2: 1,
        turn: false,
        myHand: null,
        isButtonClicked1: false,
        isButtonClicked2: false,
        switchCombo: [],
      },
    ];
    if (socket) {
      socket.emit("sendState", initalState);
    }
  };

  const StyledButton = styled(Button)`
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(110, 5, 5, 0.7);
    }
  `;

  return (
    <div className="layout">
      <Typography variant="body1">
        {stateholder[0].hand1 === 0 && stateholder[0].hand2 === 0 && (
          <div>
            <div className="winning-text">player 2 won</div>
          </div>
        )}
        {stateholder[1].hand1 === 0 && stateholder[1].hand2 === 0 && (
          <div>
            <div className="winning-text">player 1 won</div>
          </div>
        )}
      </Typography>
      <StyledButton
        variant="contained"
        className="reset-button"
        sx={{ backgroundColor: "rgb(110, 5, 5)" }}
        onClick={handleReset}
      >
        reset
      </StyledButton>
      <div className="player">
        <Typography variant="h3">player 1</Typography>
      </div>
      <Player
        stateholder={stateholder[0]}
        myHandUpdate={chooseHand}
        targetHandUpdate={slapHand}
        switchUpdate={updateSwitchCombo}
        opponentHands={[stateholder[1].hand1, stateholder[1].hand2]}
        updateSwitchHand={updateSwitchHand}
        playerid={numericId}
      />
      <div className="player2">
        <Typography variant="h3">player 2</Typography>
      </div>
      <Player
        stateholder={stateholder[1]}
        myHandUpdate={chooseHand}
        targetHandUpdate={slapHand}
        switchUpdate={updateSwitchCombo}
        opponentHands={[stateholder[0].hand1, stateholder[0].hand2]}
        updateSwitchHand={updateSwitchHand}
        playerid={numericId}
      />
      <div className="layout3">
        <Typography variant="h4">How to Play</Typography>
        <Typography variant="body1" sx={{ marginTop: "20px" }}>
          Objective of the game is to keep your hands and make the opponent lose
          theirs. For a given turn, you can hit an opponents hand with yours to
          increase the value of their hand by the value of your own hand. A hand
          disappears if the value goes over 5. Another option during a turn is
          to switch the value of your hands based on the buttons to the right of
          the hand.
        </Typography>
      </div>
    </div>
  );
};

export default Chopsticks;
