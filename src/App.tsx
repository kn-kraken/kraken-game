import GameLayout from "./layouts/GameLayout";
import SelectGender from "./components/SelectGender";
import { useGameState } from "./hooks/useGame";

function App() {
  const { gamePhase } = useGameState();

  return (
    <div className="relative min-h-screen h-screen w-screen overflow-hidden">
      {gamePhase === "setup" ? <SelectGender /> : <GameLayout />}
    </div>
  );
}

export default App;
