import * as motion from "motion/react-client";
import { useRef } from "react";
import Card from "./Card";

export type CardInfo = { description: string };

type DragConstraintsProps = {
	cardsInfo?: CardInfo[];
};

export default function CardContainer({ cardsInfo }: DragConstraintsProps) {
	const constraintsRef = useRef<HTMLDivElement>(null);
	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.2, // cards animate 0.2s one after another
			},
		},
	};

	return (
		<motion.div
			ref={constraintsRef}
			style={constraints}
			variants={containerVariants}
			animate="animate"
			initial="initial"
		>
			{cardsInfo?.map((card, index) => (
				<Card
					key={index}
					constraintsRef={constraintsRef}
					description={card.description}
				/>
			))}
		</motion.div>
	);
}

/**
 * ==============   Styles   ================
 */

const constraints = {
	height: 150,
	backgroundColor: "",
	borderRadius: 10,
	display: "flex",
	gap: 10,
	padding: 10,
	perspective: 1000,
};
