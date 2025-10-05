import { useState, useEffect } from "react";
import { motion } from "motion/react";
import scenarioData from "../mocks/scenario.json";
import { run } from "../utils";

export default function InventoryCardContainer({
  currentEventIndex,
}: {
  currentEventIndex: number;
}) {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const [profileCards, setProfileCards] = useState<any[]>([]);

  useEffect(() => {
    // Get the current scenario based on currentEventIndex
    const currentScenario = scenarioData[currentEventIndex];

    if (!currentScenario) {
      setProfileCards([]);
      return;
    }

    // Get the correct profile based on run variable
    const profile =
      run === 1
        ? currentScenario.profil_scenario_1
        : currentScenario.profil_scenario_2;

    if (!profile) {
      setProfileCards([]);
      return;
    }

    // Convert each profile property to individual cards
    const cards = [
      { id: "wiek", label: "Wiek", value: profile.wiek },
      {
        id: "status_zawodowy",
        label: "Status zawodowy",
        value: profile["status zawodowy"],
      },
      {
        id: "status_matrymonialny",
        label: "Status matrymonialny",
        value: profile["status matrymonialny"],
      },
      {
        id: "liczba_dzieci",
        label: "Liczba dzieci",
        value: profile["liczba dzieci"],
      },
      {
        id: "wysokosc_wyplaty",
        label: "Wysokość wypłaty",
        value: `${profile["wysokosc wyplaty"]} zł`,
      },
      {
        id: "rodzaj_zatrudnienia",
        label: "Rodzaj zatrudnienia",
        value: profile["rodzaj zatrudnienia"],
      },
    ];

    setProfileCards(cards);
  }, [currentEventIndex]);

  if (profileCards.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="flex flex-col gap-y-8 items-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      key={currentEventIndex} // Re-trigger animation when event changes
    >
      {profileCards.map((card, index) => (
        <motion.div
          key={`${currentEventIndex}-${card.id}`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="relative w-80 h-30"
        >
          <div className="relative w-full h-full">
            <img
              src="/bok.svg"
              alt="box"
              className="absolute inset-0 w-80 h-full"
            />
            <div className="absolute inset-0 flex justify-center items-center gap-2 px-4 my-auto text-black place-items-center">
              <h1 className="text-md">{card.label}:</h1>
              <p className="text-md pb-[4px]">{card.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
