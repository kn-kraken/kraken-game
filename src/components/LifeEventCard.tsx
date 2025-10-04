import React from "react";
import type { LifeCard, Choice } from "../types/game";
import { useGameActions, usePlayerStats } from "../hooks/useGame";

interface LifeEventCardProps {
  card: LifeCard;
}

export const LifeEventCard: React.FC<LifeEventCardProps> = ({ card }) => {
  const { makeChoice, endTurn } = useGameActions();
  const playerStats = usePlayerStats();

  const handleChoice = (choice: Choice) => {
    makeChoice(choice, card.title);

    // Automatically end turn after a short delay to show the choice effect
    setTimeout(() => {
      endTurn();
    }, 2000);
  };

  const canAffordChoice = (choice: Choice): boolean => {
    const moneyCost = choice.effects.moneyChange || 0;
    return moneyCost >= 0 || playerStats.money >= Math.abs(moneyCost);
  };

  const getChoicePreview = (choice: Choice): string => {
    const effects: string[] = [];

    if (choice.effects.healthChange) {
      const change = choice.effects.healthChange;
      effects.push(`Health ${change > 0 ? "+" : ""}${change}`);
    }

    if (choice.effects.moneyChange) {
      const change = choice.effects.moneyChange;
      effects.push(`Money ${change > 0 ? "+" : ""}$${change.toLocaleString()}`);
    }

    if (choice.effects.savingsChange) {
      const change = choice.effects.savingsChange;
      effects.push(
        `Savings ${change > 0 ? "+" : ""}$${change.toLocaleString()}`
      );
    }

    return effects.join(", ");
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-2xl p-8 my-4 shadow-2xl max-w-2xl mx-auto border border-white/10 animate-slide-in">
      <div className="flex justify-between items-start mb-6 border-b border-white/20 pb-4">
        <h3 className="text-2xl font-bold text-amber-300 flex-1 m-0">
          {card.title}
        </h3>
        <div className="bg-blue-500/20 px-4 py-2 rounded-full text-sm text-blue-400 border border-blue-500/30">
          Age {playerStats.age}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg leading-relaxed text-slate-200 m-0">
          {card.description}
        </p>
      </div>

      <div className="mt-8">
        <h4 className="text-xl mb-4 text-slate-100 text-center">
          What do you choose?
        </h4>
        <div className="flex flex-col gap-4">
          {card.choices.map((choice) => {
            const canAfford = canAffordChoice(choice);
            const preview = getChoicePreview(choice);

            return (
              <button
                key={choice.id}
                className={`bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none rounded-xl p-6 cursor-pointer transition-all duration-300 text-left border border-blue-600/30 ${
                  canAfford
                    ? "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-500 hover:to-blue-700 active:translate-y-0"
                    : "from-slate-600 to-slate-700 cursor-not-allowed opacity-60"
                }`}
                onClick={() => handleChoice(choice)}
                disabled={!canAfford}
              >
                <div className="text-base font-semibold mb-2">
                  {choice.text}
                </div>
                {preview && (
                  <div className="text-sm opacity-80 text-blue-200">
                    {preview}
                  </div>
                )}
                {!canAfford && (
                  <div className="text-xs text-red-400 mt-2 font-medium">
                    Cannot afford this choice
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {card.choices.length === 0 && (
        <div className="text-center py-8">
          <p className="mb-6 text-slate-300">
            This is just an informational event.
          </p>
          <button
            className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-none rounded-lg px-8 py-4 text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-emerald-600/30"
            onClick={() => endTurn()}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
