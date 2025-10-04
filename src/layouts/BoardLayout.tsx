import DecisionCardContainer, {
	type CardInfo,
} from "../components/DecisionCardContainer";

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
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<div className="flex-1">row1</div>
			<div className="flex-2">
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
