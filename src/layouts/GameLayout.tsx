import { useEffect, useState } from "react";
import InventoryCardContainer from "../components/InventoryCardContainer";
import StatusBar from "../components/StatusBar";
import YearCounter from "../components/YearCounter";
import BoardLayout from "./BoardLayout";
import scenario from "../mocks/scenario.json";
import { useGameActions } from "../hooks/useGame";

type GameLayoutProps = {
  children: React.ReactNode;
};

export default function GameLayout({ children }: GameLayoutProps) {
  const [decisionsInfo, setDecisionsInfo] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const actions = useGameActions();

  const [health, setHealth] = useState(50);
  const [stress, setStress] = useState(50);
  const [relationships, setRelationships] = useState(50);
  const [knowledge, setKnowledge] = useState(50);

  const handleStatChange = (stat: string, value: number) => {
    switch (stat) {
      case "zdrowie":
        setHealth((prev) => prev + value);
        break;
      case "stres":
        setStress((prev) => prev + value);
        break;
      case "relacje":
        setRelationships((prev) => prev + value);
        break;
      case "wiedza":
        setKnowledge((prev) => prev + value);
        break;
      case "angel":
        actions.addAngelMsg(value.toString());
        break;
      case "devil":
        actions.addDevilMsg(value.toString());
        break;
      default:
        break;
    }
  };

  const handleNextEvent = () => {
    setCurrentEventIndex(scenario[currentEventIndex].event_order_scenario_1);
  };

  useEffect(() => {
    if (!scenario[currentEventIndex]) return;
    const decisions = scenario[currentEventIndex].decisions;
    const stats = scenario[currentEventIndex].stats_changes;
    const filteredDecisions = decisions.filter((decision) => stats[decision]);
    const mappedStats = filteredDecisions.map((decision) => {
      const statChange = stats[decision];
      return {
        ...statChange,
        description: decision,
      };
    });
    setDecisionsInfo(mappedStats);
  }, [currentEventIndex]);

  if (!scenario[currentEventIndex])
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Koniec gry!</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 flex flex-col gap-4 p-4">
        <StatusBar label="Zdrowie" value={health} />
        <StatusBar label="Stres" value={stress} />
        <StatusBar label="Relacje" value={relationships} />
        <StatusBar label="Wiedza" value={knowledge} />
        <YearCounter />
      </div>
      <div className="flex-2">
        <BoardLayout
          cardsInfo={decisionsInfo}
          handleStatChange={handleStatChange}
          description={scenario[currentEventIndex]?.description}
          handleNextEvent={handleNextEvent}
        >
          {children}
        </BoardLayout>
      </div>
      <div className="flex-1">
        <InventoryCardContainer />
      </div>
    </div>
  );
}
