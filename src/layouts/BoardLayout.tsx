import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Angel from "../components/Angel";
import DecisionCardContainer, {
  type CardInfo,
} from "../components/DecisionCardContainer";
import Devil from "../components/Devil";
import { useGameActions, useGameState } from "../hooks/useGame";
import type { Scenario } from "../types/game";
import { getAvatarFilename } from "../utils";
import { cn } from "@/lib/utils";

type BoardLayoutProps = {
  children: React.ReactNode;
  cardsInfo: CardInfo[];
  description: string;
  currentScenario: Scenario;
  handleStatChange: (stat: string, value: number) => void;
  handleNextEvent: () => void;
};

export default function BoardLayout({
  children,
  cardsInfo,
  description,
  currentScenario,
  handleStatChange,
  handleNextEvent,
}: BoardLayoutProps) {
  const gameState = useGameState();
  const actions = useGameActions();
  const avatarFilename = getAvatarFilename(currentScenario);

  useEffect(() => {
    let timer1: any;
    let timer2: any;
    if (gameState.angelInfo) {
      timer1 = setTimeout(() => {
        actions.addDevilMsg("");
      }, 4000);
    }
    if (gameState.devilInfo) {
      timer2 = setTimeout(() => {
        actions.addAngelMsg("");
      }, 4000);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [gameState]);
  const msg = gameState.angelInfo ?? gameState.devilInfo;
  console.log(avatarFilename);

  return (
    <div className="min-h-screen bg-gray-100 gap-8 flex flex-col">
      <div className="flex-[0_0_250px] relative">
        <Devil />
        <AnimatePresence>
          {msg && (
            <>
              <motion.div
                className="absolute w-1/3 border-2 border-black bg-white text-sm py-4 px-6 rounded-xl z-10"
                style={{
                  left: gameState.devilInfo ? "20%" : "50%",
                  top: "40%",
                  transform: "translateY(-50%)",
                }}
              >
                {msg}
              </motion.div>
              {/* Three circles that appear after the message */}
              <motion.div
                className="absolute flex gap-1 z-10"
                style={{
                  left: gameState.devilInfo ? "17%" : "78%",
                  top: "55%",
                }}
              >
                <div
                  className={cn(
                    "border-2 border-black bg-white rounded-full",
                    gameState.devilInfo ? "w-6 h-6" : "w-3 h-3"
                  )}
                ></div>
                <div className="border-2 border-black bg-white rounded-full w-4 h-4"></div>
                <div
                  className={cn(
                    "border-2 border-black bg-white rounded-full",
                    gameState.devilInfo ? "w-2 h-2" : "w-5 h-5"
                  )}
                ></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <Angel />
      </div>
      <div className="flex-[0_0_auto] flex-col mx-auto flex items-center justify-end">
        {avatarFilename && (
          <div className="flex flex-col items-center">
            <img
              src={`/public/natalia/${avatarFilename}`}
              alt="Natalia avatar"
              className="w-96 h-96 object-cover rounded-full mb-4 border-3 border-t-1 border-black"
            />
          </div>
        )}
        {children}
        <p className="p-4 text-lg left-0 rounded-xl border-b-3 border-black justify-center mx-auto text-center bg-white bg-opacity-80">
          {description}
        </p>
      </div>
      <div className="flex-1">
        <DecisionCardContainer
          cardsInfo={cardsInfo}
          handleStatChange={handleStatChange}
          handleNextEvent={handleNextEvent}
        />
      </div>
    </div>
  );
}
