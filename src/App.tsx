import { useState } from "react";
import AnimatedNumbers from "react-animated-numbers";
import DecisionCardContainer, {
	type CardInfo,
} from "./components/DecisionCardContainer";
import ProgressBar from "./components/ProgressBar";
import GameLayout from "./layouts/GameLayout";

function App() {
	const [count, setCount] = useState(0);
	const [age, setAge] = useState(20);
	const cardInfo: CardInfo[] = [
		{ description: "Sraka" },
		{ description: "Dupa" },
		{ description: "Chuj" },
	];

	const MAX_AGE = 65;

	return <GameLayout children={undefined} />;

	return (
		<>
			<ProgressBar max={MAX_AGE} value={age} size="lg" />
			<DecisionCardContainer cardsInfo={cardInfo} />
			<AnimatedNumbers
				animateToNumber={count}
				fontStyle={{ fontSize: 48 }}
			/>
			<button onClick={() => setCount(count + 10)}>Increase count</button>
			<button onClick={() => setAge(age + 1)}>Increase age</button>
		</>
	);
}

export default App;
