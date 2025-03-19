import { useState, useEffect, useCallback } from "react";

export default function Card({ setcurrentScore, limit, offset }) {
  const [pkmnUrlArray, setPkmnUrlArray] = useState([]);
  const [pkmnSpriteArray, setPkmnSpriteArray] = useState([]);
  const [pkmnNameArray, setPkmnNameArray] = useState([]);
  const [cardImageArray, setcardImageArray] = useState([]);

  // const [currentScore, setcurrentScore] = useState(0);
  const [clickedPokemons, setclickedPokemons] = useState([]);

  async function fetchKantoPokemon() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
    );
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
    if (pkmnNameArray.length === 0 || pkmnSpriteArray === 0) return null;
    const randomNumber = Math.floor(Math.random() * 151);
    const pokemonName = pkmnNameArray[randomNumber];
    const pokemonUrl = pkmnSpriteArray[randomNumber];
    return { pokemonName, pokemonUrl };
  };

  const generateRandomCards = useCallback(() => {
    if (pkmnNameArray.length === 0 || pkmnSpriteArray.length === 0) return;
    const cardObjectArray = [];
    for (let i = 0; i < 8; i++) {
      cardObjectArray.push(generateRandomCard());
    }

    setcardImageArray(cardObjectArray);
  }, [pkmnNameArray, pkmnSpriteArray]);

  const countScore = (pokemon) => {
    console.log(`you clicked on the pokemon ${pokemon}`);

    if (clickedPokemons.includes(pokemon)) {
      console.log("you lost");

      setcurrentScore(0);
      setclickedPokemons([]);
    } else {
      setcurrentScore((prevScore) => prevScore + 1);
    }

    setclickedPokemons((prevClicked) => [...prevClicked, pokemon]);
  };

  useEffect(() => {
    if (pkmnNameArray.length > 0 && pkmnSpriteArray.length > 0) {
      generateRandomCards();
    }
  }, [generateRandomCards, pkmnNameArray, pkmnSpriteArray]);

  return (
    <div className="cards">
      {cardImageArray.map((card, index) => (
        <div className="card" id={index} key={index}>
          <h3>{card.pokemonName}</h3>
          <img
            src={card.pokemonUrl}
            onClick={() => {
              generateRandomCards();
              countScore(card.pokemonName);
            }}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
