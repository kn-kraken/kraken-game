import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

interface ProgressBarProps {
	value: number; // Progress value between 0 and 100
	max?: number; // Maximum value (default: 100)
	size?: "sm" | "md" | "lg"; // Size variant
	variant?: "primary" | "success" | "warning" | "danger"; // Color variant
	animationDuration?: number; // Animation duration in seconds
	onComplete?: () => void; // Callback when progress reaches 100%
	className?: string; // Additional CSS classes
}

export default function ProgressBar({
	value,
	max = 100,
	size = "md",
	variant = "primary",
	animationDuration = 0.8,
	onComplete,
	className = "",
}: ProgressBarProps) {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

	// Call onComplete when progress reaches 100%
	useEffect(() => {
		if (percentage >= 100 && onComplete) {
			const timer = setTimeout(onComplete, animationDuration * 1000);
			return () => clearTimeout(timer);
		}
	}, [percentage, onComplete, animationDuration]);

	// Size classes
	const sizeClasses = {
		sm: "h-2",
		md: "h-4",
		lg: "h-6",
	};

	// Variant classes for progress fill
	const variantClasses = {
		primary: "bg-blue-500",
		success: "bg-green-500",
		warning: "bg-yellow-500",
		danger: "bg-red-500",
	};

	return (
		<div
			className={`w-full bg-gray-200 rounded-full overflow-hidden shadow-inner ${sizeClasses[size]} ${className}`}
		>
			<motion.div
				className={`h-full rounded-full ${variantClasses[variant]}`}
				initial={{ width: 0 }}
				animate={{ width: `${percentage}%` }}
				transition={{
					duration: animationDuration,
					ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth animation
				}}
			/>
		</div>
	);
}

// Example usage component with controls
export function ProgressBarDemo() {
	const [progress, setProgress] = useState(0);

	const handleStart = () => {
		setProgress(0);
		const interval = setInterval(() => {
			setProgress((prev: number) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + 2;
			});
		}, 100);
	};

	const handleReset = () => {
		setProgress(0);
	};

	const handleComplete = () => {
		console.log("Progress completed!");
	};

	return (
		<div className="p-5 max-w-2xl">
			<h2 className="text-2xl font-bold mb-6">Progress Bar Demo</h2>

			{/* Standard progress bar */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-3">
					Standard Progress Bar
				</h3>
				<ProgressBar value={progress} onComplete={handleComplete} />
			</div>

			{/* Different sizes */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-3">Sizes</h3>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1 block">
							Small
						</label>
						<ProgressBar value={progress} size="sm" />
					</div>
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1 block">
							Medium
						</label>
						<ProgressBar value={progress} size="md" />
					</div>
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1 block">
							Large
						</label>
						<ProgressBar value={progress} size="lg" />
					</div>
				</div>
			</div>

			{/* Different variants */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-3">Variants</h3>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1 block">
							Primary
						</label>
						<ProgressBar value={progress} variant="primary" />
					</div>
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1 block">
							Success
						</label>
						<ProgressBar value={progress} variant="success" />
					</div>
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1 block">
							Warning
						</label>
						<ProgressBar value={progress} variant="warning" />
					</div>
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1 block">
							Danger
						</label>
						<ProgressBar value={progress} variant="danger" />
					</div>
				</div>
			</div>

			{/* Controls */}
			<div className="flex items-center gap-4">
				<button
					onClick={handleStart}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
				>
					Start Progress
				</button>
				<button
					onClick={handleReset}
					className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium"
				>
					Reset
				</button>
				<input
					type="range"
					min="0"
					max="100"
					value={progress}
					onChange={(e) => setProgress(Number(e.target.value))}
					className="flex-1 ml-4"
				/>
				<span className="text-sm font-medium text-gray-600 min-w-[3rem]">
					{Math.round(progress)}%
				</span>
			</div>
		</div>
	);
}
