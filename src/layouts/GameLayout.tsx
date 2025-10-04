import { useEffect, useState } from "react";
import InventoryCardContainer from "../components/InventoryCardContainer";
import StatusBar from "../components/StatusBar";
import YearCounter from "../components/YearCounter";
import BoardLayout from "./BoardLayout";
import scenario from "../mocks/scenario.json";

type GameLayoutProps = {
	children: React.ReactNode;
};

export default function GameLayout({ children }: GameLayoutProps) {
	const [decisionsInfo, setDecisionsInfo] = useState([]);

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
			default:
				break;
		}
	};

	useEffect(() => {
		const decisions = scenario[0].decisions;
		const stats = scenario[0].stats_changes;
		const filteredDecisions = decisions.filter(
			(decision) => stats[decision]
		);
		const mappedStats = filteredDecisions.map((decision) => {
			const statChange = stats[decision];
			return {
				...statChange,
				description: decision,
			};
		});
		setDecisionsInfo(mappedStats);
	}, []);

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
					description={scenario[0].description}
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
