import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Counter({ target = 100 }) {
	const count = useMotionValue(0);
	const rounded = useTransform(() => Math.round(count.get()));

	useEffect(() => {
		const controls = animate(count, target, { duration: 1 });
		return () => controls.stop();
	}, [target]);

	return <motion.pre style={text}>{rounded}</motion.pre>;
}

/**
 * ==============   Styles   ================
 */

const text = {
	fontSize: 64,
	color: "#8df0cc",
};
