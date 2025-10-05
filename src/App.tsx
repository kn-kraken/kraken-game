import { useState } from "react";
import GameLayout from "./layouts/GameLayout";
import SelectGender from "./components/SelectGender";
import { useGameState } from "./hooks/useGame";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import { run } from "@/utils";

function App() {
  const { gamePhase } = useGameState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="relative min-h-screen h-screen w-screen overflow-hidden rounded-2xl">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed right-4 bottom-4 z-50 w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center border-2 border-gray-200 hover:border-gray-300">
            <img
              src="/zus.webp"
              alt="Zus Logo"
              className="w-12 h-12 object-contain"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-xl max-w-4xl w-auto p-0 bg-transparent border-none shadow-none">
          <div className="relative">
            <img
              src={`scenario${run ? 2 : 1}.png`}
              alt="Zus Image"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {gamePhase === "setup" ? (
        <SelectGender />
      ) : (
        <GameLayout>
          <></>
        </GameLayout>
      )}
    </div>
  );
}

export default App;
