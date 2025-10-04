import * as motion from "motion/react-client";
import React from "react";

type CardProps = {
	constraintsRef: React.RefObject<HTMLDivElement | null>;
	frontContent?: string;
	backContent?: string;
};

export default function DecisionCard({
	constraintsRef,
	frontContent = "🎮",
	backContent = "⭐",
}: CardProps) {
	const cardVariants = {
		initial: {
			rotateY: 180,
		},
		animate: {
			rotateY: 0,
		},
	};

	return (
		<motion.div
			drag
			dragConstraints={constraintsRef}
			dragElastic={0.2}
			className="h-40 w-28 relative cursor-pointer transform-3d"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			variants={cardVariants}
			transition={{
				duration: 0.8,
				ease: [0.25, 0.1, 0.25, 1],
				rotateY: {
					duration: 1.0,
					ease: [0.25, 0.1, 0.25, 1],
				},
			}}
		>
			<motion.div className="absolute w-full h-full rounded-xl flex items-center justify-center backface-hidden rotate-y-0 bg-fuchsia-700">
				<div className="flex flex-col items-center justify-center gap-2 text-white text-center">
					<div>{frontContent}</div>
				</div>
			</motion.div>

			<motion.div className="absolute w-full h-full rounded-xl flex items-center justify-center backface-hidden rotate-y-180 bg-blue-600">
				<div className="flex flex-col items-center justify-center gap-2 text-white text-center">
					<div>{backContent}</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
