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

export const PHOTO_MAPPING = {
  "podejmujesz pracę na umowe uop": 23,
  "idziesz na studia": 29,
  "pracujesz na czarno": 28,
  tak: 25,
  nie: 26,
  "uop pełen wymiar": 23,
  "b2b pełen wymiar": 35,
  "uop ½ etatu": 24,
  "b2b ½ etatu": 21,
  "umowa zlecenie pełen wymiar": 21,
  "umowa zlecenie ½ etatu": 31,
  "szukam intensywnie nowej pracy": 30,
  "inwestuję pieniądze w kryptowaluty": 1,
  "podejmuje pracę u szwagra (bez umowy)": 28,
  "zostaję bezrobotny": 26,
  macierzyński: 28,
  "zareczyny tak": 20,
  "macierzyński, rodzicielski": 32,
  "macierzyński, rodzicielski, wychowawczy": 33,
  "wynajmuję adwokata": 14,
  "rezygnuję z usług prawniczych": 34,
  "wynajmuję mieszkanie": 18,
  "kupuję mieszkanie na kredyt hipoteczny": 9,
  "kupuję mieszkanie za gotówkę": 15,
  "wprowadzam się do mieszkania czynszowego": 5,
  "wybieram pracownicze plany kapitałowe (ppk)": 10,
  "wybieram pracownicze plany emerytalne (ppe)": 6,
  "rezygnuję z planów na rzecz indywidualnego konta emerytalnego (ike)": 13,
  "nie wybieram żadnego z planów": 19,
  "kupuję i przygotowuję samodzielnie zdrowsze jedzenie": 4,
  "kupuję zdrowy catering": 7,
  "kontynuuję obecny styl żywieniowy": 16,
  "przestaję palić, póki nie jest to nałóg": 8,
  "kontynuuję palenie, by mieć przerwy": 17,
  "biorę l4": 2,
  "biorę urlop": 3,
  "idę do pracy": 27,
};
