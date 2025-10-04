import * as motion from "motion/react-client";
import { useRef } from "react";
import DecisionCard from "./DecisionCard";

export type CardInfo = { description: string };

type DragConstraintsProps = {
	cardsInfo?: CardInfo[];
};

export default function DecisionCardContainer({
	cardsInfo,
}: DragConstraintsProps) {
	const constraintsRef = useRef<HTMLDivElement>(null);
	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<motion.div
			className="flex rounded-xl gap-3 p-3 perspective-distant h-40"
			ref={constraintsRef}
			variants={containerVariants}
			animate="animate"
			initial="initial"
		>
			{cardsInfo?.map((card, index) => (
				<DecisionCard
					key={index}
					constraintsRef={constraintsRef}
					description={card.description}
				/>
			))}
		</motion.div>
	);
}
