import Angel from "../components/Angel";
import DecisionCardContainer, {
  type CardInfo,
} from "../components/DecisionCardContainer";
import Devil from "../components/Devil";
import { useGameState } from "../hooks/useGame";

type BoardLayoutProps = {
  children: React.ReactNode;
  cardsInfo: CardInfo[];
  description: string;
  handleStatChange: (stat: string, value: number) => void;
};

export default function BoardLayout({
  children,
  cardsInfo,
  description,
  handleStatChange,
  handleNextEvent,
}: BoardLayoutProps) {
  const gameState = useGameState();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 relative">
        <Devil message={gameState.devilInfo} />
        <Angel message={gameState.angelInfo} />
      </div>
      <div className="flex-2 flex items-end w-full">
        {children}
        <p className="p-4 text-lg">{description}</p>
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
