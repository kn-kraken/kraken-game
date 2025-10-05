import { useGameState } from "../hooks/useGame";

type Props = {
  className?: string;
};

export default function YearCounter({ className }: Props) {
  const state = useGameState();

  return <h1 className={className}>LVL {state.turnNumber}</h1>;
}
