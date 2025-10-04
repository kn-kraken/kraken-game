import { useGameState } from "../hooks/useGame";

type Props = {
  className?: string;
};

export default function YearCounter({ className }: Props) {
  const state = useGameState();

  return <div className={className}>Years: {state.turnNumber}</div>;
}
