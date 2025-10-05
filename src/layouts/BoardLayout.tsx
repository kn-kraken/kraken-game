import Angel from "../components/Angel";
import DecisionCardContainer, {
  type CardInfo,
} from "../components/DecisionCardContainer";
import Devil from "../components/Devil";
import { useGameState } from "../hooks/useGame";
import type { Scenario } from "../types/game";
import { getAvatarFilename } from "../utils";

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
  const avatarFilename = getAvatarFilename(currentScenario);

  return (
    <div className="min-h-screen bg-gray-100 gap-12 flex flex-col">
      <div className="flex-1 relative">
        <Devil message={gameState.devilInfo} />
        <Angel message={gameState.angelInfo} />
      </div>
      <div className="flex-col mx-auto flex items-center w-full justify-end">
        {avatarFilename && (
          <div className="flex flex-col items-center">
            <img
              src={`/natalia/${avatarFilename}`}
              alt="Natalia avatar"
              className="w-96 h-96 object-cover rounded-full mb-4"
            />
          </div>
        )}
        {children}
        <p className="p-4 text-lg left-0 rounded-xl justify-center mx-auto text-center bg-white bg-opacity-80">
          {description}
        </p>
      </div>
      <div className="">
        <DecisionCardContainer
          cardsInfo={cardsInfo}
          handleStatChange={handleStatChange}
          handleNextEvent={handleNextEvent}
        />
      </div>
    </div>
  );
}
