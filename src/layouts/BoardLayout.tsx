import DecisionCardContainer, {
	type CardInfo,
} from "../components/DecisionCardContainer";

type BoardLayoutProps = {
	children: React.ReactNode;
};

const cardInfo: CardInfo[] = [
	{ description: "Sraka" },
	{ description: "Dupa" },
	{ description: "Chuj" },
];

export default function BoardLayout({ children }: BoardLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<div className="flex-1">row1</div>
			<div className="flex-2">{children}</div>
			<div className="flex-1">
				<DecisionCardContainer cardsInfo={cardInfo} />
			</div>
		</div>
	);
}
