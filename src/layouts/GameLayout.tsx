import InventoryCardContainer from "../components/InventoryCardContainer";
import StatusBar from "../components/StatusBar";
import YearCounter from "../components/YearCounter";
import BoardLayout from "./BoardLayout";

type GameLayoutProps = {
	children: React.ReactNode;
};

export default function GameLayout({ children }: GameLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-100 flex">
			<div className="flex-1 flex flex-col gap-4 p-4">
				<StatusBar label="Health" value={75} />
				<StatusBar label="Health" value={75} />
				<StatusBar label="Health" value={75} />
				<StatusBar label="Health" value={75} />
				<StatusBar label="Health" value={75} />
				<YearCounter />
			</div>
			<div className="flex-2">
				<BoardLayout>{children}</BoardLayout>
			</div>
			<div className="flex-1">
				<InventoryCardContainer />
			</div>
		</div>
	);
}
