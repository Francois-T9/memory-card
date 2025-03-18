// import { useState } from "react";

export default function Header({ currentScore, bestScore }) {
  return (
    <div className="header">
      <h1>Memory card game</h1>
      <p>Current score : {currentScore}</p>
      <p>Best score : {bestScore}</p>
    </div>
  );
}
