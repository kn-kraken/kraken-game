import { useEffect } from "react";
import { useGameActions } from "../hooks/useGame";

type Props = {
  message?: string;
};

export default function Angel({ message }: Props) {
  const actions = useGameActions();

  useEffect(() => {
    let timer: any;
    if (message) {
      timer = setTimeout(() => {
        actions.addAngelMsg("");
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="w-64 h-64 absolute right-0 top-8 flex items-center justify-center">
      <div className="relative">
        <img src="/a1.svg" alt="aniol" className="w-50 h-50 object-contain" />
        <img
          src="/chmurka_flip.png"
          alt="chmurka"
          className="w-64 h-32 absolute top-0 left-0 transform -translate-x-[80%] -translate-y-16"
        />
        <div className="absolute max-w-[8rem] left-0 top-0 text-xs -translate-x-[110%] -translate-y-8">
          test tes 123 few few few few few few
        </div>
      </div>
    </div>
  );
}
