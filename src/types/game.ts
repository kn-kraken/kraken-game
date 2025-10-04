// Player statistics and status
export interface PlayerStats {
  age: number;
  health: number; // 0-100 scale
  money: number;
  savings: number;
}

// Life event card structure
// export interface LifeCard {
//   id: string;
//   title: string;
//   description: string;
//   choices: Choice[];
//   minAge?: number; // Optional age requirement
//   maxAge?: number;
// }

// Choice options for each card
export interface Choice {
  id: string;
  text: string;
  effects: ChoiceEffects;
}

// Effects of making a choice
export interface ChoiceEffects {
  healthChange?: number;
  moneyChange?: number;
  savingsChange?: number;
  message?: string; // Feedback message for the player
}

// Overall game state
export interface GameState {
  playerStats: PlayerStats;
  gamePhase: GamePhase;
  turnNumber: number;
  gameHistory: GameHistoryEntry[];
  isGameActive: boolean;
  devilInfo?: string;
  angelInfo?: string;
}

// Different phases of the game
export const GamePhase = {
  SETUP: "setup",
  CARD_DISPLAY: "card_display",
  CHOICE_MADE: "choice_made",
  TURN_END: "turn_end",
  GAME_OVER: "game_over",
} as const;

export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

// History entry for tracking player decisions
export interface GameHistoryEntry {
  age: number;
  cardTitle: string;
  choiceText: string;
  effects: ChoiceEffects;
  timestamp: Date;
}

// Action types for the reducer
export const GameActionType = {
  START_GAME: "START_GAME",
  MAKE_CHOICE: "MAKE_CHOICE",
  END_TURN: "END_TURN",
  RESET_GAME: "RESET_GAME",
  UPDATE_STATS: "UPDATE_STATS",
  CALL_ANGEL: "CALL_ANGEL",
  CALL_DEVIL: "CALL_DEVIL",
} as const;

export type GameActionType =
  (typeof GameActionType)[keyof typeof GameActionType];

// Specific action interfaces
export interface StartGameAction {
  type: typeof GameActionType.START_GAME;
}

export interface MakeChoiceAction {
  type: typeof GameActionType.MAKE_CHOICE;
  payload: {
    choice: Choice;
    cardTitle: string;
  };
}

export interface EndTurnAction {
  type: typeof GameActionType.END_TURN;
}

export interface ResetGameAction {
  type: typeof GameActionType.RESET_GAME;
}

export interface UpdateStatsAction {
  type: typeof GameActionType.UPDATE_STATS;
  payload: Partial<PlayerStats>;
}

export interface DrawInfo {
  description: string;
  life_period: string[];
  decisions: Decision[];
  angel: string;
  devil: string;
  stats_changes: Record<string, StatChange>;
}
export interface Decision {
  id: string;
  text: string;
  // Add other decision properties as needed
}

export const StatType = {
  HEALTH: "health",
  MONEY: "money",
  SAVINGS: "savings",
} as const;

export type StatType = (typeof StatType)[keyof typeof StatType];

export type StatChange = {
  [K in StatType]?: number;
};

// Union type for all actions
export type GameAction =
  | StartGameAction
  | MakeChoiceAction
  | EndTurnAction
  | ResetGameAction
  | UpdateStatsAction
  | CallAngelAction
  | CallDevilAction;

// Initial default values
export const INITIAL_PLAYER_STATS: PlayerStats = {
  age: 18,
  health: 80, // Start with good health
  money: 1000, // Starting money
  savings: 0, // No initial savings
};

export const RETIREMENT_AGE = 65;
export const STARTING_AGE = 18;

export interface StatsChanges {
  zdrowie: number;
  stres: number;
  relacje: number;
  mądrość: number;
  angel?: string;
  devil?: string;
}

export interface SpecialConditions {
  status_zawodowy?: string;
  wysokość_wypłaty?: number;
  rodzaj_zatrudnienia?: string;
}

export interface Scenario {
  description: string;
  decisions: string[];
  event_order_scenario_1: number;
  event_order_scenario_2: number;
  stats_changes: Record<string, StatsChanges>;
  special_conditions: Record<string, SpecialConditions>;
}

export interface CallAngelAction {
  type: typeof GameActionType.CALL_ANGEL;
  payload: {
    message: string;
  };
}

export interface CallDevilAction {
  type: typeof GameActionType.CALL_DEVIL;
  payload: {
    message: string;
  };
}
