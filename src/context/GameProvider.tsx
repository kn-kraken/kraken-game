import { GameContext, type GameContextType } from "./GameContext";
import { gameReducer, initialGameState } from "../reducers/gameReducer";
import { useReducer, type ReactNode } from "react";

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const value: GameContextType = {
    state,
    dispatch,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
