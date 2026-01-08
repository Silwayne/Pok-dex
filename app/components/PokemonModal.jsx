"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PokemonModal.module.css";

export default function PokemonModal({ pokemon, onClose, pokemonList, setSelectedPokemon }) {
  const [details, setDetails] = useState(null);

  const navigatePokemon = (direction) => {
    const currentIndex = pokemonList.findIndex(p => p.id === pokemon.id);
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = pokemonList.length - 1;
    if (nextIndex >= pokemonList.length) nextIndex = 0;

    setSelectedPokemon(pokemonList[nextIndex]);
  };

  useEffect(() => {
    async function fetchDetails() {
      setDetails(null); 
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
      const data = await res.json();
      setDetails(data);
    }
    fetchDetails();
  }, [pokemon.id]);

  if (!pokemon) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={styles.overlay}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50 }} 
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className={styles.modal}
        style={{ background: "linear-gradient(180deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,1) 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.navBtnLeft} 
          onClick={() => navigatePokemon(-1)}
        >
          ❮
        </button>

        <button 
          className={styles.navBtnRight} 
          onClick={() => navigatePokemon(1)}
        >
          ❯

        </button>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        
        <div className={styles.content}>
          <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 drop-shadow-2xl mb-4" />
          <h2 style={{ fontFamily: 'Atma, sans-serif' }} className="text-4xl font-bold mb-6">
            {pokemon.germanName}
          </h2>

          {details && (
            <div className="w-full space-y-4">
              {details.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between text-sm uppercase font-bold text-slate-400">
                    <span>{stat.stat.name}</span>
                    <span className="text-white">{stat.base_stat}</span>
                  </div>
                  <div className={styles.statBarContainer}>
                    <motion.div 
                      className={styles.statBarFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      style={{ backgroundColor: stat.base_stat > 80 ? "#4ade80" : "#fbbf24" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}