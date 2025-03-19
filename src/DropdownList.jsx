export default function DropdownList({ setlimit, setoffset }) {
  const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh"];

  const fetchFromRegionName = (region) => {
    if (region === "Kanto") {
      setoffset(0);
      setlimit(151);
    } else if (region === "Johto") {
      setoffset(151);
      setlimit(100);
    } else if (region === "Hoenn") {
      setoffset(251);
      setlimit(135);
    } else if (region === "Sinnoh") {
      setoffset(386);
      setlimit(107);
    }
    console.log(region);
  };

  const handleChange = (event) => {
    fetchFromRegionName(event.target.value);
  };

  return (
    <div className="dropdown">
      <select name="region-list" id="" onChange={handleChange}>
        {regions.map((region, index) => (
          <option value={region} key={index}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
