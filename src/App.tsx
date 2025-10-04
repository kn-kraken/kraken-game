import GameLayout from "./layouts/GameLayout";
import YearCounter from "./components/YearCounter";
import SelectGender from "./components/SelectGender";
import { useGameState } from "./hooks/useGame";

function App() {
	const { gamePhase } = useGameState();

	return (
		<GameLayout>
			<div className="relative min-h-screen h-screen w-screen">
				{gamePhase === "setup" && <SelectGender />}
				<YearCounter className="absolute top-4 right-4" />
			</div>
		</GameLayout>
	);
}

export default App;
