import { Mars, Venus } from "lucide-react";
import { useGameActions } from "../hooks/useGame";
import { AnimatePresence, motion } from "motion/react";

export default function SelectGender() {
  const actions = useGameActions();

  const clickGender = () => {
    actions.startGame();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <AnimatePresence>
      <div className="w-screen h-screen absolute z-0 bg-black opacity-20"></div>
      <motion.div
        className="w-full absolute top-0 bottom-0 m-auto h-32 flex gap-32 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={() => clickGender()}
          className="bg-blue-500 text-white text-4xl rounded p-4 min-w-64 grid place-items-center"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Male
          <Mars className="w-12 h-12" />
        </motion.button>
        <motion.button
          onClick={() => clickGender()}
          className="bg-pink-500 text-white text-4xl rounded p-4 min-w-64 grid place-items-center"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Female
          <Venus className="w-12 h-12" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
