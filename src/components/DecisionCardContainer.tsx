import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import DecisionCard from "./DecisionCard";
import { AnimatePresence } from "motion/react";

export type CardInfo = {
	description: string;
	zdrowie: number;
	stres: number;
	relacje: number;
	wiedza: number;
};

type DragConstraintsProps = {
	cardsInfo: CardInfo[];
	handleStatChange: (stat: string, value: number) => void;
};

export default function DecisionCardContainer({
	cardsInfo,
	handleStatChange,
}: DragConstraintsProps) {
	const [cards, setCards] = useState<CardInfo[]>([]);
	const ref = useRef<HTMLDivElement | null>(null);
	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const handleDragEnd = (
		childRef: React.RefObject<HTMLDivElement | null>,
		index: number
	): void => {
		const containerRect = ref.current?.getBoundingClientRect();
		const dragRect = childRef.current?.getBoundingClientRect();
		const containerHeight = containerRect?.height || 0;

		if (!dragRect || !containerRect) return;
		const isOutside = dragRect?.top < containerRect?.top - containerHeight;

		if (isOutside) {
			setCards((prev) => prev.filter((_, i) => i !== index));
			Object.entries(cards[index]).forEach(([stat, value]) => {
				if (stat !== "description") {
					handleStatChange(stat, value as number);
				}
			});
		}
	};

	useEffect(() => {
		if (cardsInfo) {
			setCards(cardsInfo);
		}
	}, [cardsInfo]);

	return (
		<motion.div
			className="flex rounded-xl p-3 perspective-distant h-40 justify-around"
			variants={containerVariants}
			ref={ref}
			animate="animate"
			initial="initial"
		>
			<AnimatePresence mode="popLayout">
				{cards?.map((card, index) => (
					<motion.div
						key={card.description}
						layout
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
					>
						<DecisionCard
							handleDragEnd={(childRef) =>
								handleDragEnd(childRef, index)
							}
							handleStatChange={handleStatChange}
							frontContent={card.description}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
}
