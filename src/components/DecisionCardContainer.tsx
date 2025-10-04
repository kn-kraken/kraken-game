import * as motion from "motion/react-client";
import { useRef, useState } from "react";
import DecisionCard from "./DecisionCard";
import { AnimatePresence } from "motion/react";

export type CardInfo = { description: string };

type DragConstraintsProps = {
	cardsInfo?: CardInfo[];
};

export default function DecisionCardContainer({
	cardsInfo,
}: DragConstraintsProps) {
	const [cards, setCards] = useState(cardsInfo || []);
	const ref = useRef<HTMLDivElement | null>(null);
	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const handleDragEnd = (childRef, index) => {
		const containerRect = ref.current?.getBoundingClientRect();
		const dragRect = childRef.current?.getBoundingClientRect();
		const containerHeight = containerRect?.height || 0;

		if (!dragRect || !containerRect) return;
		console.log({ dupa: dragRect.top, container: containerRect.top });
		const isOutside = dragRect?.top < containerRect?.top - containerHeight;

		if (isOutside) {
			setCards((prev) => prev.filter((_, i) => i !== index));
			console.log("Dragged outside constraint!");
		} else {
			console.log("Within constraint");
		}
	};

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
							containerRef={ref}
							handleDragEnd={(childRef) =>
								handleDragEnd(childRef, index)
							}
							frontContent={card.description}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
}
