import React, { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { GameState, GameAction } from "../types/game";
import { gameReducer, initialGameState } from "../reducers/gameReducer";

// Context type definition
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Create context
export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

// Provider component props
interface GameProviderProps {
  children: ReactNode;
}

// Provider component
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const value: GameContextType = {
    state,
    dispatch,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
