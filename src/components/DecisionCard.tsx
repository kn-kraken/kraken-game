import * as motion from "motion/react-client";
import React, { useRef } from "react";

type CardProps = {
	constraintsRef: React.RefObject<HTMLDivElement | null>;
	frontContent?: string;
	backContent?: string;
};

export default function DecisionCard({
	frontContent = "🎮",
	backContent = "⭐",
}: CardProps) {
	const ref = useRef(null);
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
			dragConstraints={ref}
			ref={ref}
			dragElastic={1}
			className="h-40 w-28 relative cursor-pointer transform-3d"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 1.3 }}
			whileDrag={{ scale: 1.3 }}
			variants={cardVariants}
			transition={{
				duration: 0.2,
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
