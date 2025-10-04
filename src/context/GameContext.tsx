import React, { createContext } from "react";
import type { GameState, GameAction } from "../types/game";

// Context type definition
export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Create context
export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

// Provider component props
