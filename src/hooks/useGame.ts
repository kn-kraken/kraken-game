import { useContext } from "react";
import type { Choice, PlayerStats } from "../types/game";
import { GameActionType } from "../types/game";
import { GameContext } from "../context/GameContext";

// Hook to use game context with error handling
export const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
};

// Hook for accessing game state
export const useGameState = () => {
  const { state } = useGameContext();
  return state;
};

// Hook for game actions
export const useGameActions = () => {
  const { dispatch } = useGameContext();

  const startGame = () => {
    dispatch({ type: GameActionType.START_GAME });
  };

  const makeChoice = (choice: Choice, cardTitle: string) => {
    dispatch({
      type: GameActionType.MAKE_CHOICE,
      payload: { choice, cardTitle },
    });
  };

  const endTurn = () => {
    dispatch({ type: GameActionType.END_TURN });
  };

  const resetGame = () => {
    dispatch({ type: GameActionType.RESET_GAME });
  };

  const updateStats = (stats: Partial<PlayerStats>) => {
    dispatch({
      type: GameActionType.UPDATE_STATS,
      payload: stats,
    });
  };

  return {
    startGame,
    makeChoice,
    endTurn,
    resetGame,
    updateStats,
  };
};

// Hook for player statistics
export const usePlayerStats = () => {
  const { state } = useGameContext();
  return state.playerStats;
};

// Hook for game status
export const useGameStatus = () => {
  const { state } = useGameContext();
  return {
    gamePhase: state.gamePhase,
    isGameActive: state.isGameActive,
    turnNumber: state.turnNumber,
    gameHistory: state.gameHistory,
  };
};

// Hook for health status helpers
export const useHealthStatus = () => {
  const playerStats = usePlayerStats();

  const getHealthColor = () => {
    if (playerStats.health >= 70) return "#4ade80"; // green
    if (playerStats.health >= 50) return "#facc15"; // yellow
    if (playerStats.health >= 30) return "#fb923c"; // orange
    return "#ef4444"; // red
  };

  const getHealthLabel = () => {
    if (playerStats.health >= 80) return "Excellent";
    if (playerStats.health >= 60) return "Good";
    if (playerStats.health >= 40) return "Fair";
    if (playerStats.health >= 20) return "Poor";
    return "Critical";
  };

  return {
    health: playerStats.health,
    color: getHealthColor(),
    label: getHealthLabel(),
  };
};

// Hook for wealth status helpers
export const useWealthStatus = () => {
  const playerStats = usePlayerStats();
  const totalWealth = playerStats.money + playerStats.savings;

  const getWealthLabel = () => {
    if (totalWealth >= 100000) return "Wealthy";
    if (totalWealth >= 50000) return "Well-off";
    if (totalWealth >= 10000) return "Stable";
    if (totalWealth >= 1000) return "Getting by";
    return "Struggling";
  };

  const getWealthColor = () => {
    if (totalWealth >= 50000) return "#4ade80"; // green
    if (totalWealth >= 10000) return "#facc15"; // yellow
    if (totalWealth >= 1000) return "#fb923c"; // orange
    return "#ef4444"; // red
  };

  return {
    money: playerStats.money,
    savings: playerStats.savings,
    totalWealth,
    label: getWealthLabel(),
    color: getWealthColor(),
  };
};
