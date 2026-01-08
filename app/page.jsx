"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
        );
        const data = await response.json();

        const detailPromises = data.results.map(async (pkm) => {
          const res = await fetch(pkm.url);
          const details = await res.json();

          const speciesRes = await fetch(details.species.url);
          const speciesData = await speciesRes.json();
          const germanName =
            speciesData.names.find((n) => n.language.name === "de")?.name ||
            details.name;

          return {
            id: details.id,
            name: details.name,
            germanName: germanName,
            image: details.sprites.other["official-artwork"].front_default,
            types: details.types.map((t) => t.type.name),
            stats: details.stats,
          };
        });

        const results = await Promise.all(detailPromises);
        setPokemonList(results);
      } catch (error) {
        console.error("Fehler beim Laden:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <header className="flex flex-col items-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          Pokédex Pro
        </h1>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Pokémon suchen..."
            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-white"
          />
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          <p className="col-span-full text-center animate-pulse text-xl">
            Lade Pokémon...
          </p>
        ) : (
          pokemonList.map((pokemon) => (
            <motion.div
              key={pokemon.id}
              initial={{ perspective: 1000 }}
              whileHover={{
                scale: 1.05,
                rotateX: 20, // Etwas stärker für besseren Effekt
                rotateY: 20,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl p-5 shadow-xl cursor-pointer border border-white/10"             
              style={{
                ...getTypeGradient(pokemon.types),
                transformStyle: "preserve-3d", // DAS ist entscheidend für den 3D-Inhalt
              }}
            >
              {/* ID im Hintergrund - bleibt flach auf der Karte */}
              <span className="absolute top-2 right-4 text-white/20 font-bold text-2xl select-none">
                #{String(pokemon.id).padStart(3, '0')}
              </span>

              {/* Dieser Container hält das Bild und den Namen und hebt sie ab */}
             <div 
                className="flex flex-col items-center justify-center min-h-[180px]" 
                style={{ 
                transform: "translateZ(10px)", // Extrem hoher Wert zum Testen
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
                }}
              >
                <img 
                  src={pokemon.image} 
                  alt={pokemon.germanName}
                  className="w-32 h-32 object-contain"
                  style={{ 
                  transform: "translateZ(50px)", // Das Bild springt nochmal weiter vor
                  filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.5))" 
                }}
              />

              <div style={{ transform: "translateZ(30px)" }} className="text-center">
                <h2
                  className={`mt-4 text-2xl font-bold drop-shadow-md ${["electric", "ice", "bug", "fairy", "normal", "flying"].includes(pokemon.types[0]) ? "text-slate-900" : "text-white"}`}>
                  {pokemon.germanName}
                </h2>
              
                <div className="flex gap-2 mt-2 justify-center">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`px-3 py-1 bg-white/20 rounded-full text-xs capitalize backdrop-blur-md border border-white/5 ${["electric", "ice", "bug", "fairy", "normal", "flying"].includes(pokemon.types[0]) ? "text-slate-900" : "text-white"}`}>
                      {type}
                    </span>
                  ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}

const BASE_COLORS = {
  grass: "#087708",
  fire: "#FF0000",
  water: "#0000FF",
  bug: "#90EE90",
  normal: "#69695F",
  poison: "#810A81",
  electric: "#FFFF00",
  ground: "#A62C2C",
  fairy: "#D480CF",
  fighting: "#FFA602",
  psychic: "#E55A74",
  rock: "#808080",
  ghost: "#483D8B",
  ice: "#68BAAC",
  dragon: "#253152",
  dark: "#000000",
  steel: "#C0C0C0",
  flying: "#87B5E5",
};

function getTypeGradient(types) {
  const color1 = BASE_COLORS[types[0]] || "#777";
  const color2 = types[1] ? BASE_COLORS[types[1]] : color1;

  return {
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
  };
}
