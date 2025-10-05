import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Scenario } from "./types/game";

/**
 * Combines clsx and tailwind-merge for optimal class merging.
 * @param inputs - Class names or conditional class values.
 * @returns A single string with merged class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const run = 2 as const;

/**
 * Gets the correct avatar filename based on the run variable and scenario data
 * @param scenario - The current scenario object
 * @returns The avatar filename or null if "None" or no valid avatar
 */
export const getAvatarFilename = (scenario: Scenario): string | null => {
  if (run === 1) {
    return scenario.photo_scenario_1 !== "None" && scenario.photo_scenario_1
      ? scenario.photo_scenario_1
      : null;
  } else if (run === 2) {
    return scenario.photo_scenario_2 !== "None" && scenario.photo_scenario_2
      ? scenario.photo_scenario_2
      : null;
  }
  return null;
};
