import { useState } from "react";
import InventoryCard from "./InventoryCard";
import { motion } from "motion/react";

export default function InventoryCardContainer() {
	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const [cards, setCards] = useState<string[]>(["Card 1"]);

	return (
		<motion.div
			className="flex flex-col gap-y-2 items-center"
			variants={containerVariants}
			initial="initial"
			animate="animate"
		>
			<button
				onClick={() => setCards([...cards, `Card ${cards.length + 1}`])}
			>
				Add Card
			</button>
			{cards.map((card, index) => (
				<InventoryCard key={index} description={card} />
			))}
		</motion.div>
	);
}
