import Header from "./Header";
import Board from "./Board";
import { useState } from "react";

function App() {
  const [currentScore, setcurrentScore] = useState(0);
  const [bestScore, setbestScore] = useState(0);

  if (currentScore > bestScore) {
    setbestScore(currentScore);
  }

  return (
    <div className="app">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <Board setcurrentScore={setcurrentScore} setbestScore={setbestScore} />
    </div>
  );
}

export default App;
