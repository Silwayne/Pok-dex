"use client";

import { motion } from "framer-motion";
import styles from "./PokemonCard.module.css";

// Wir kopieren die Farben hierher, damit die Karte unabhängig ist
const BASE_COLORS = {
  grass: "#087708", fire: "#FF0000", water: "#0000FF", bug: "#90EE90",
  normal: "#69695F", poison: "#810A81", electric: "#FFFF00", ground: "#A62C2C",
  fairy: "#D480CF", fighting: "#FFA602", psychic: "#E55A74", rock: "#808080",
  ghost: "#483D8B", ice: "#68BAAC", dragon: "#253152", dark: "#000000",
  steel: "#C0C0C0", flying: "#87B5E5",
};

// Auch die Funktion ziehen wir hierher
function getTypeGradient(types) {
  const color1 = BASE_COLORS[types[0]] || "#777";
  const color2 = types[1] ? BASE_COLORS[types[1]] : color1;
  return { background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)` };
}

export default function PokemonCard({ pokemon }) {
  // Check für die Textfarbe (hell oder dunkel)
  const isDarkText = ["electric", "ice", "bug", "fairy", "normal", "flying", "fighting"].includes(pokemon.types[0]);
  const textColor = isDarkText ? "text-slate-900" : "text-white";

  return (
    <motion.div
      initial={{ perspective: 1000 }}
      whileHover={{ scale: 1, rotateX: 20, rotateY: 20 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={styles.cardContainer}
      style={{
        ...getTypeGradient(pokemon.types),
        transformStyle: "preserve-3d",
      }}
    >
      <span className={`${styles.idBadge} ${textColor}`}>
        #{String(pokemon.id).padStart(3, '0')}
      </span>

      <div className={styles.innerContent}>
        <img 
          src={pokemon.image} 
          alt={pokemon.germanName} 
          className={styles.pokemonImg}
        />

        <div className="mt-4 w-full flex flex-col items-center gap-2">
          <h2 style={{ fontFamily: 'Atma, sans-serif' }} className={`${styles.pokemonName} ${textColor}`}>
            {pokemon.germanName}
          </h2>
          
          <div className={styles.typeContainer}>
            {pokemon.types.map((type) => (
              <span
                style={{ fontFamily: 'Atma, sans-serif' }}
                key={type}
                className={`flex items-center text-[20px] gap-2 px-5 py-3 capitalize ${textColor}`}
              >
                <img src={`/images/${type}.png`} alt={type} className="w-5 h-5 object-contain" />
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}