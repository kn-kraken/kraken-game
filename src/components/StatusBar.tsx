import * as motion from "motion/react-client";
import { useState } from "react";
import Puf from "/public/puf.svg";

interface StatusBarProps {
  label: string; // Name of the stat (e.g., "Health", "Stamina", "Mana")
  value: number; // Current value (0-100)
  maxValue?: number; // Maximum value (default: 100)
}

export default function StatusBar({
  label,
  value,
  maxValue = 100,
}: StatusBarProps) {
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);

  // Dynamic color classes based on percentage
  const getStatusColorClass = () => {
    if (percentage > 60) return "bg-green-500"; // Green
    if (percentage > 30) return "bg-yellow-500"; // Yellow
    return "bg-red-500"; // Red
  };

  const barColorClass = getStatusColorClass();

  return (
    <div className="flex items-center gap-3 font-semibold text-sm text-white relative">
      {/* Status Label */}
      <h1 className="min-w-20 text-lg text-black text-left capitalize">
        {label}
      </h1>
      <div className="absolute w-12 translate-x-[140%] z-10">
        <Puf />
      </div>

      {/* Status Bar */}
      <div className="flex-1 w-5 h-5 bg-gray-700 rounded-xl overflow-hidden relative border border-white/10 min-w-40">
        <motion.div
          className={`h-full rounded-xl relative shadow-inner ${barColorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </div>

      {/* Value Display */}
      <div className="min-w-16 text-right opacity-90 text-black">
        {Math.round(value)}/{maxValue}
      </div>
    </div>
  );
}

// Predefined status bar types for common game stats
export function HealthBar({
  value,
  maxValue = 100,
}: {
  value: number;
  maxValue?: number;
}) {
  return <StatusBar label="Health" value={value} maxValue={maxValue} />;
}

export function StaminaBar({
  value,
  maxValue = 100,
}: {
  value: number;
  maxValue?: number;
}) {
  return <StatusBar label="Stamina" value={value} maxValue={maxValue} />;
}

export function ManaBar({
  value,
  maxValue = 100,
}: {
  value: number;
  maxValue?: number;
}) {
  return <StatusBar label="Mana" value={value} maxValue={maxValue} />;
}

export function ExperienceBar({
  value,
  maxValue = 100,
}: {
  value: number;
  maxValue?: number;
}) {
  return <StatusBar label="Experience" value={value} maxValue={maxValue} />;
}

// Demo component showcasing different status bars
export function StatusBarDemo() {
  const [health, setHealth] = useState(75);
  const [stamina, setStamina] = useState(60);
  const [mana, setMana] = useState(90);
  const [experience, setExperience] = useState(45);

  const handleRandomize = () => {
    setHealth(Math.floor(Math.random() * 100));
    setStamina(Math.floor(Math.random() * 100));
    setMana(Math.floor(Math.random() * 100));
    setExperience(Math.floor(Math.random() * 100));
  };

  return (
    <div className="p-5 bg-gray-800 rounded-xl max-w-2xl">
      <h2 className="text-white mb-5 text-lg font-bold">Game Status Bars</h2>

      <div className="flex flex-col gap-4">
        {/* Predefined Status Bars */}
        <HealthBar value={health} />
        <StaminaBar value={stamina} />
        <ManaBar value={mana} />
        <ExperienceBar value={experience} />

        {/* Custom Status Bars */}
        <StatusBar label="Shield" value={35} />
        <StatusBar label="Energy" value={80} />
      </div>

      {/* Control Button */}
      <button
        onClick={handleRandomize}
        className="mt-5 px-5 py-2.5 bg-blue-500 text-white border-none rounded-md cursor-pointer font-semibold hover:bg-blue-600 transition-colors"
      >
        Randomize Values
      </button>
    </div>
  );
}
