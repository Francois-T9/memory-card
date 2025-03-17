import { useState } from "react";

export default function Header() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="header">
      <h1>Memory card game</h1>
      <p>Current score : {currentScore}</p>
      <p>Best score : {bestScore}</p>
    </div>
  );
}
