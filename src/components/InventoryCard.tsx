import { motion } from "motion/react";

export type InventoryCardInfo = { description: string };

export default function InventoryCard({ description }: InventoryCardInfo) {
	return (
		<motion.div
			className="h-24 w-48 bg-red-500 rounded-xl shadow-lg flex items-center justify-center text-center p-4"
			initial={{ x: 100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
		>
			{description}
		</motion.div>
	);
}
