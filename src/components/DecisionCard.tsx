import { PHOTO_MAPPING } from "@/utils";
import * as motion from "motion/react-client";
import { useRef } from "react";

type CardProps = {
  handleDragEnd: (childRef: React.RefObject<HTMLDivElement | null>) => void;
  handleStatChange: (stat: string, value: number) => void;
  frontContent?: string;
  backContent?: string;
};

export default function DecisionCard({
  handleDragEnd,
  frontContent = "🎮",
  backContent = "⭐",
}: CardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const cardVariants = {
    // initial: {
    // 	rotateY: 180,
    // },
    animate: {
      rotateY: 0,
    },
  };

  const lowerFrontContent = frontContent?.toLowerCase() || "";

  console.log("frontContent", frontContent);
  console.log(`/public/icons/${PHOTO_MAPPING[lowerFrontContent]}`);

  return (
    <motion.div
      className="h-48 w-42 relative cursor-pointer transform-3d" // Bigger card
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragMomentum={false}
      dragElastic={1}
      ref={ref}
      onDragEnd={() => handleDragEnd(ref)}
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
      <motion.div className="absolute w-full h-full rounded-xl flex items-center justify-center backface-hidden rotate-y-0 bg-[#f2f4f6]">
        <img
          src="/public/karta.svg"
          alt="card"
          className="w-[400px] absolute pointer-events-none"
        />
        <img
          src={`/public/icons/${PHOTO_MAPPING[lowerFrontContent as any]}.svg`}
          alt="card front"
          className="w-26 pointer-events-none absolute top-3 left-0 right-0 mx-auto"
        />
        <div className="flex top-8 relative flex-col items-center justify-center gap-2 text-black text-center">
          <div className="z-1 text-sm max-w-[80%]">{frontContent}</div>
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
