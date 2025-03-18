import Card from "./Card";

export default function Board({ setcurrentScore, setbestScore }) {
  // const [currentScore, setcurrentScore] = useState(0);

  const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh"];
  return (
    <div className="board">
      <h2>Board</h2>

      <Card setcurrentScore={setcurrentScore} setbestScore={setbestScore} />
    </div>
  );
}
