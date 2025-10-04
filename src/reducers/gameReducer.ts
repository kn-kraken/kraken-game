import type {
  GameState,
  GameAction,
  PlayerStats,
  GameHistoryEntry,
} from "../types/game";
import {
  GameActionType,
  GamePhase,
  INITIAL_PLAYER_STATS,
  RETIREMENT_AGE,
} from "../types/game";

// Helper function to clamp values within reasonable bounds
const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

// Helper function to apply stat changes safely
const applyStatChanges = (
  currentStats: PlayerStats,
  changes: Partial<PlayerStats>
): PlayerStats => {
  return {
    age: changes.age ?? currentStats.age,
    health: clampValue(currentStats.health + (changes.health ?? 0), 0, 100),
    money: Math.max(0, currentStats.money + (changes.money ?? 0)),
    savings: Math.max(0, currentStats.savings + (changes.savings ?? 0)),
  };
};

// Initial game state
export const initialGameState: GameState = {
  playerStats: { ...INITIAL_PLAYER_STATS },
  gamePhase: GamePhase.SETUP,
  turnNumber: 18,
  gameHistory: [],
  isGameActive: false,
};

// Main game reducer function
export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case GameActionType.START_GAME:
      return {
        ...initialGameState,
        playerStats: { ...INITIAL_PLAYER_STATS },
        gamePhase: GamePhase.CARD_DISPLAY,
        isGameActive: true,
      };

    case GameActionType.MAKE_CHOICE: {
      const { choice, cardTitle } = action.payload;
      const effects = choice.effects;

      // Apply choice effects to player stats
      const updatedStats = applyStatChanges(state.playerStats, {
        health: effects.healthChange,
        money: effects.moneyChange,
        savings: effects.savingsChange,
      });

      // Create history entry
      const historyEntry: GameHistoryEntry = {
        age: state.playerStats.age,
        cardTitle,
        choiceText: choice.text,
        effects,
        timestamp: new Date(),
      };

      return {
        ...state,
        playerStats: updatedStats,
        gamePhase: GamePhase.CHOICE_MADE,
        gameHistory: [...state.gameHistory, historyEntry],
      };
    }

    case GameActionType.CALL_ANGEL:
      return {
        ...state,
        angelInfo: action.payload.message,
      };

    case GameActionType.CALL_DEVIL:
      return {
        ...state,
        devilInfo: action.payload.message,
      };

    case GameActionType.END_TURN: {
      const newAge = state.playerStats.age + 1;
      const isGameOver = newAge > RETIREMENT_AGE;

      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          age: newAge,
        },
        gamePhase: isGameOver ? GamePhase.GAME_OVER : GamePhase.CARD_DISPLAY,
        turnNumber: state.turnNumber + 1,
        isGameActive: !isGameOver,
      };
    }

    case GameActionType.UPDATE_STATS:
      return {
        ...state,
        playerStats: applyStatChanges(state.playerStats, action.payload),
      };

    case GameActionType.RESET_GAME:
      return initialGameState;

    default:
      return state;
  }
};

// Selector functions for easy state access
export const getPlayerStats = (state: GameState) => state.playerStats;
export const getGamePhase = (state: GameState) => state.gamePhase;
export const isGameActive = (state: GameState) => state.isGameActive;
export const getGameHistory = (state: GameState) => state.gameHistory;
export const getTurnNumber = (state: GameState) => state.turnNumber;

// Helper functions for game logic
export const canAfford = (playerStats: PlayerStats, cost: number): boolean => {
  return playerStats.money >= cost;
};

export const isHealthy = (playerStats: PlayerStats): boolean => {
  return playerStats.health > 30; // Consider below 30 as unhealthy
};

export const isRetirementReady = (playerStats: PlayerStats): boolean => {
  return playerStats.age >= RETIREMENT_AGE;
};

export const getHealthStatus = (health: number): string => {
  if (health >= 80) return "Excellent";
  if (health >= 60) return "Good";
  if (health >= 40) return "Fair";
  if (health >= 20) return "Poor";
  return "Critical";
};

export const getWealthStatus = (money: number, savings: number): string => {
  const totalWealth = money + savings;
  if (totalWealth >= 100000) return "Wealthy";
  if (totalWealth >= 50000) return "Well-off";
  if (totalWealth >= 10000) return "Stable";
  if (totalWealth >= 1000) return "Getting by";
  return "Struggling";
};
