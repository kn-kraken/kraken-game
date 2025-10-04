import * as motion from "motion/react-client";
import React from "react";

type CardProps = {
	constraintsRef: React.RefObject<HTMLDivElement | null>;
	frontContent?: string;
	backContent?: string;
	frontColor?: string;
	backColor?: string;
};

export default function Card({
	constraintsRef,
	frontContent = "🎮",
	backContent = "⭐",
	frontColor = "#ff0088",
	backColor = "#0088ff",
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
			style={cardContainer}
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
			<motion.div
				style={{
					...cardFace,
					...cardFront,
					backgroundColor: frontColor,
				}}
			>
				<div style={cardContent}>
					<div style={cardIcon}>{frontContent}</div>
					<div style={cardLabel}>Front</div>
				</div>
			</motion.div>

			<motion.div
				style={{
					...cardFace,
					...cardBack,
					backgroundColor: backColor,
				}}
			>
				<div style={cardContent}>
					<div style={cardIcon}>{backContent}</div>
					<div style={cardLabel}>Back</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

/**
 * ==============   Styles   ================
 */

const cardContainer = {
	width: 120,
	height: 160,
	position: "relative" as const,
	cursor: "pointer",
	transformStyle: "preserve-3d" as const,
};

const cardFace = {
	position: "absolute" as const,
	width: "100%",
	height: "100%",
	borderRadius: 12,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backfaceVisibility: "hidden" as const,
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	border: "2px solid rgba(255, 255, 255, 0.2)",
};

const cardFront = {
	transform: "rotateY(0deg)", // Front is visible when container rotateY is 0
};

const cardBack = {
	transform: "rotateY(180deg)", // Back is visible when container rotateY is 180
};

const cardContent = {
	display: "flex",
	flexDirection: "column" as const,
	alignItems: "center",
	justifyContent: "center",
	gap: 8,
	color: "white",
	textAlign: "center" as const,
};

const cardIcon = {
	fontSize: 32,
	marginBottom: 4,
};

const cardLabel = {
	fontSize: 12,
	fontWeight: "600",
	textTransform: "uppercase" as const,
	letterSpacing: "0.5px",
	opacity: 0.9,
};
