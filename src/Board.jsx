import Card from "./Card";
import DropdownList from "./DropdownList";
import { useState } from "react";

export default function Board({ setcurrentScore }) {
  // const [currentScore, setcurrentScore] = useState(0);
  const [limit, setlimit] = useState(0);
  const [offset, setoffset] = useState(0);

  return (
    <div className="board">
      <h2>Board</h2>
      {/* <DropdownList setlimit={setlimit} setoffset={setoffset} /> */}

      <Card setcurrentScore={setcurrentScore} limit={limit} offset={offset} />
    </div>
  );
}
