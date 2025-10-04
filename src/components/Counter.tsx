import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Counter({ target = 100 }) {
	const count = useMotionValue(0);
	const rounded = useTransform(() => Math.round(count.get()));

	useEffect(() => {
		const controls = animate(count, target, { duration: 1 });
		return () => controls.stop();
	}, [target]);

	return <motion.pre className="text-6xl text-black">{rounded}</motion.pre>;
}
