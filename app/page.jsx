"use client";

import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import HeaderLogo from "./components/HeaderLogo";
import SearchBar from "./components/SearchBar";

// Farben für die Header-Buttons brauchen wir noch hier
const BASE_COLORS = {
  grass: "#087708", fire: "#FF0000", water: "#0000FF", bug: "#90EE90",
  normal: "#69695F", poison: "#810A81", electric: "#FFFF00", ground: "#A62C2C",
  fairy: "#D480CF", fighting: "#FFA602", psychic: "#E55A74", rock: "#808080",
  ghost: "#483D8B", ice: "#68BAAC", dragon: "#253152", dark: "#000000",
  steel: "#C0C0C0", flying: "#87B5E5",
};

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        await fetchBatch(20, 0); 
        await fetchBatch(131, 20);
        setOffset(151); 
      } catch (error) {
        console.error("Fehler:", error);
      } finally {
        setLoading(false);
      }
    }

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
      setPokemonList(prev => {
        const newList = [...prev, ...results];
        return newList.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i).sort((a, b) => a.id - b.id);
      });
    }
    loadInitialData();
  }, []);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
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
      setOffset(prev => prev + limit);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Hintergrund-Deko */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <HeaderLogo />

      {/* 2. Suche (Bleibt oben kleben) */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {pokemonList
            .filter(p => p.germanName.toLowerCase().includes(searchTerm.toLowerCase()) || p.types.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
            .map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          }
        </section>

      {/* Buttons & Top Button */}
      <div className="flex flex-col items-center gap-8 mt-16 pb-20">
        {!searchTerm && (
          <button onClick={loadMore} disabled={loading} className="group relative w-24 h-24 bg-white border-4 border-slate-900 rounded-full overflow-hidden shadow-lg hover:translate-y-1 transition-all">
            <div className="absolute top-0 w-full h-1/2 bg-red-600 border-b-4 border-slate-900 group-hover:bg-red-500" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-slate-900 rounded-full z-10 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-400 animate-ping' : 'bg-slate-300'}`} />
            </div>
            <span className="absolute bottom-1 w-full text-center text-[20px] font-bold text-slate-800 uppercase z-20">Mehr</span>
          </button>
        )}
        <button onClick={() => {setSearchTerm(""); window.scrollTo({top: 0, behavior: 'smooth'});}} className="px-6 py-2 bg-slate-800/50 rounded-full border border-slate-700 text-slate-300 hover:text-white shadow-lg">Reset & Center</button>
      </div>

      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="fixed bottom-8 right-8 w-14 h-14 bg-white border-4 border-slate-900 rounded-full shadow-2xl hover:scale-110 z-50 flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 w-full h-1/2 bg-red-600 border-b-2 border-slate-900" />
        <div className="absolute w-4 h-4 bg-white border-2 border-slate-900 rounded-full z-10" />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-900 z-20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
      </button>
    </main>
  );
}