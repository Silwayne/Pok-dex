"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Neu: Suchbegriff
  const [offset, setOffset] = useState(0);           // Neu: Position für "Mehr laden"
  const limit = 20;

// 1. Der verbesserte Hintergrund-Loader
useEffect(() => {
  async function loadInitialData() {
    try {
      setLoading(true);
      // Erst die ersten 20 für den Speed
      await fetchBatch(20, 0); 
      
      // Dann den Rest der ersten Generation (bis 151)
      await fetchBatch(131, 20);
      
      // WICHTIG: Den Offset auf 151 setzen, damit "Mehr laden" bei 152 weitermacht
      setOffset(151); 
    } catch (error) {
      console.error("Fehler:", error);
    } finally {
      setLoading(false);
    }
  }

  // Die Batch-Funktion bleibt fast gleich, aber wir sortieren nach ID
  async function fetchBatch(amount, currentOffset) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${currentOffset}`);
    const data = await response.json();

    const detailPromises = data.results.map(async (pkm) => {
      const res = await fetch(pkm.url);
      const details = await res.json();
      const speciesRes = await fetch(details.species.url);
      const speciesData = await speciesRes.json();
      const germanName = speciesData.names.find(n => n.language.name === 'de')?.name || details.name;

      return {
        id: details.id,
        name: details.name,
        germanName: germanName,
        image: details.sprites.other["official-artwork"].front_default,
        types: details.types.map(t => t.type.name),
      };
    });

    const results = await Promise.all(detailPromises);
    // Wir nutzen eine Funktion in setState, um sicherzugehen, dass wir keine Duplikate bekommen
    setPokemonList(prev => {
      const newList = [...prev, ...results];
      // Duplikate filtern (falls ID schon vorhanden) und sortieren
      return newList
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
        .sort((a, b) => a.id - b.id);
    });
  }

  loadInitialData();
}, []);

// 2. Die "Mehr laden" Funktion für die restlichen ~900 Pokémon
const loadMore = async () => {
  if (loading) return; // Verhindert Doppelklicks
  setLoading(true);
  
  try {
    // Er lädt immer das nächste Paket basierend auf dem aktuellen Offset
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    
    const detailPromises = data.results.map(async (pkm) => {
      const res = await fetch(pkm.url);
      const details = await res.json();
      const speciesRes = await fetch(details.species.url);
      const speciesData = await speciesRes.json();
      const germanName = speciesData.names.find(n => n.language.name === 'de')?.name || details.name;

      return {
        id: details.id,
        name: details.name,
        germanName: germanName,
        image: details.sprites.other["official-artwork"].front_default,
        types: details.types.map(t => t.type.name),
      };
    });

    const results = await Promise.all(detailPromises);
    setPokemonList(prev => [...prev, ...results].sort((a, b) => a.id - b.id));
    setOffset(prev => prev + limit); // Offset erhöhen für das nächste Mal
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <header className="sticky top-0 z-[100] w-full mb-8">
  {/* Hintergrund mit Glas-Effekt */}
  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"></div>

  <div className="relative max-w-7xl mx-auto px-4 py-6 flex flex-col items-center">
    <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-red-500 via-yellow-400 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
      Pokédex Pro
    </h1>

    <div className="w-full max-w-2xl flex flex-col gap-4">
      {/* Suche */}
      <input 
        type="text" 
        placeholder="Pokémon suchen..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 rounded-2xl bg-slate-800/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-white placeholder:text-slate-500 shadow-inner"
      />

      {/* Typ-Filter-Leiste */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
        <button
          onClick={() => setSearchTerm("")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${searchTerm === "" ? 'bg-white text-slate-900 border-white' : 'bg-slate-800 text-slate-400 border-white/5 hover:border-white/20'}`}
        >
          Alle
        </button>
        {Object.keys(BASE_COLORS).map((type) => (
          <button
            key={type}
            onClick={() => setSearchTerm(type)}
            style={{ 
              backgroundColor: searchTerm.toLowerCase() === type ? BASE_COLORS[type] : 'transparent',
              borderColor: BASE_COLORS[type],
              color: searchTerm.toLowerCase() === type ? '#fff' : BASE_COLORS[type]
            }}
            className="px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  </div>
</header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
  {/* Wichtig: Wir fragen NICHT mehr am Anfang ob loading=true ist. 
      Wir zeigen die Liste IMMER an, wenn sie Daten hat.
  */}
  {pokemonList
    .filter(p => p.germanName.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((pokemon) => (
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
                  className={`mt-4 text-2xl font-bold drop-shadow-md ${["electric", "ice", "bug", "fairy", "normal", "flying", "fighting"].includes(pokemon.types[0]) ? "text-slate-900" : "text-white"}`}>
                  {pokemon.germanName}
                </h2>
              
                <div className="flex gap-2 mt-2 justify-center">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`px-3 py-1 bg-white/20 rounded-full text-xs capitalize backdrop-blur-md border border-white/5 ${["electric", "ice", "bug", "fairy", "normal", "flying", "fighting"].includes(pokemon.types[0]) ? "text-slate-900" : "text-white"}`}>
                      {type}
                    </span>
                  ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        }
        {loading && pokemonList.length > 0 && (
          <div className="col-span-full flex justify-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
          </div>
        )}

  {/* Falls wir ganz am Anfang sind und noch GAR KEINE Daten haben */}
  {loading && pokemonList.length === 0 && (
    <p className="col-span-full text-center animate-pulse text-xl">
      Lade Pokédex...
    </p>
  )}
      </section>

      {/* --- AB HIER: Diese Teile müssen NOCH INNERHALB der Home-Funktion sein --- */}
      
      {/* Buttons Bereich */}
      <div className="flex flex-col items-center gap-8 mt-16 pb-20">
  {!searchTerm && (
    <button 
      onClick={loadMore}
      disabled={loading}
      className="group relative flex items-center justify-center w-24 h-24 bg-white border-4 border-slate-900 rounded-full shadow-[0_10px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_5px_0_0_rgba(0,0,0,0.2)] hover:translate-y-1 transition-all overflow-hidden"
    >
      {/* Obere rote Hälfte des Pokéballs */}
      <div className="absolute top-0 w-full h-1/2 bg-red-600 border-b-4 border-slate-900 group-hover:bg-red-500 transition-colors" />
      {/* Der schwarze Ring in der Mitte */}
      <div className="absolute w-8 h-8 bg-white border-4 border-slate-900 rounded-full z-10 flex items-center justify-center shadow-inner">
        <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-400 animate-ping' : 'bg-slate-300'}`} />
      </div>
      <span className="absolute bottom-1 text-[20px] font-bold text-slate-800 uppercase z-20">Mehr</span>
    </button>
  )}

  <button 
    onClick={() => {setSearchTerm(""); window.scrollTo({top: 0, behavior: 'smooth'});}}
    className="px-6 py-2 bg-slate-800/50 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-300 hover:text-white transition-all text-sm font-medium backdrop-blur-sm"
  >
    Reset & Center
  </button>
</div>

    <button 
  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
  className="fixed bottom-8 right-8 w-14 h-14 bg-white border-4 border-slate-900 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center overflow-hidden group"
>
  <div className="absolute top-0 w-full h-1/2 bg-red-600 border-b-2 border-slate-900" />
  <div className="absolute w-4 h-4 bg-white border-2 border-slate-900 rounded-full z-10" />
  {/* Ein kleiner Pfeil, der nach oben zeigt */}
  <svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-15 text-slate-900 z-20 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
  </svg>
</button>

    </main>
  ); // <--- HIER endet erst die return-Klammer
} // <--- HIER endet erst die Home-Funktion!

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
