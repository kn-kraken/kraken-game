import { useState } from "react";
import AnimatedNumbers from "react-animated-numbers";
import CardContainer, { type CardInfo } from "./components/CardContainer";
import ProgressBar from "./components/ProgressBar";
import YearCounter from "./components/YearCounter";

function App() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(20);
  const cardInfo: CardInfo[] = [
    { description: "Sraka" },
    { description: "Dupa" },
    { description: "Chuj" },
  ];

  const MAX_AGE = 65;

  return (
    <div className="relative">
      <ProgressBar max={MAX_AGE} value={age} size="lg" />
      <CardContainer cardsInfo={cardInfo} />
      <YearCounter className="absolute top-4 right-4" />
      <AnimatedNumbers animateToNumber={count} fontStyle={{ fontSize: 48 }} />
      <button onClick={() => setCount(count + 10)}>Increase count</button>
      <button onClick={() => setAge(age + 1)}>Increase age</button>
    </div>
  );
}

export default App;
