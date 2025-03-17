import { useState, useEffect } from "react";

export default function Card() {
  const [pkmnUrlArray, setPkmnUrlArray] = useState([]);
  const [pkmnSpriteArray, setPkmnSpriteArray] = useState([]);
  const [pkmnNameArray, setPkmnNameArray] = useState([]);

  async function fetchKantoPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const allPokemon = await response.json();

    const urls = allPokemon.results.map((elem) => elem.url);

    setPkmnUrlArray(urls);
  }
  useEffect(() => {
    fetchKantoPokemon();
  }, []);

  async function fetchPokemonSprites(urlArray) {
    const sprites = await Promise.all(
      urlArray.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.sprites.front_default;
      })
    );
    setPkmnSpriteArray(sprites);
  }

  async function fetchPokemonNames(urlArray) {
    console.log(urlArray);
    const names = await Promise.all(
      urlArray.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.species.name;
      })
    );
    setPkmnNameArray(names);
  }

  useEffect(() => {
    if (pkmnUrlArray.length > 0) {
      fetchPokemonSprites(pkmnUrlArray);
      fetchPokemonNames(pkmnUrlArray);
    }
  }, [pkmnUrlArray]);

  const generateRandomCard = () => {
    const randomNumber = Math.round(Math.random() * 100);
    const pokemonName = pkmnNameArray[randomNumber];
    const pokemonUrl = pkmnSpriteArray[randomNumber];
    return { pokemonName, pokemonUrl };
  };

  const cardObjectArray = [];
  for (let i = 0; i < 8; i++) {
    cardObjectArray.push(generateRandomCard());
  }

  return (
    <div className="cards">
      <div className="card" id="card-1">
        <h3>{cardObjectArray[0].pokemonName}</h3>
        <img src={cardObjectArray[0].pokemonUrl} alt="" />
      </div>
      <div className="card" id="card-2">
        <h3>{cardObjectArray[1].pokemonName}</h3>
        <img src={cardObjectArray[1].pokemonUrl} alt="" />
      </div>
      <div className="card" id="card-3">
        <h3>{cardObjectArray[2].pokemonName}</h3>
        <img src={cardObjectArray[2].pokemonUrl} alt="" />
      </div>
      <div className="card" id="card-4">
        <h3>{cardObjectArray[3].pokemonName}</h3>
        <img src={cardObjectArray[3].pokemonUrl} alt="" />
      </div>
    </div>
  );
}
