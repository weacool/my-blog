interface PlayerState {
  player: number;
  hand1: number;
  hand2: number;
  turn: boolean;
  myHand: number | null;
  isButtonClicked1: boolean;
  isButtonClicked2: boolean;
  switchCombo: [number, number][] | [];
}

interface PlayerProps {
  stateholder: PlayerState;
  myHandUpdate: (myHand: number, player: number) => void;
  targetHandUpdate: (targetHand: number, player: number) => void;
  switchUpdate: (switchCombo: [number, number][], player: number) => void;
  opponentHands: number[];
  updateSwitchHand: (switchValue: number[], player: number) => void;
  playerid: number | undefined;
}
