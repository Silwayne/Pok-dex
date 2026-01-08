"use client"; // Wichtig für Interaktivität (Suche, Klicks)
import { useState, useEffect } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Wir laden die ersten 20 Pokémon
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
        const data = await response.json();

        // Jetzt laden wir ALLE Details dieser 20 Pokémon GLEICHZEITIG
        const detailPromises = data.results.map(async (pkm) => {
          const res = await fetch(pkm.url);
          const details = await res.json();
          
          // Spezies laden für den deutschen Namen (deine Logik aus dem txt!)
          const speciesRes = await fetch(details.species.url);
          const speciesData = await speciesRes.json();
          const germanName = speciesData.names.find(n => n.language.name === 'de')?.name || details.name;

          return {
            id: details.id,
            name: details.name,
            germanName: germanName,
            image: details.sprites.other["official-artwork"].front_default,
            types: details.types.map(t => t.type.name),
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
      {/* Header Bereich */}
      <header className="flex flex-col items-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          Pokédex Pro
        </h1>
        <div className="w-full max-w-md">
          <input 
            type="text" 
            placeholder="Pokémon suchen..." 
            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
      </header>

      {/* Grid für die Karten */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          <p className="col-span-full text-center">Lade Pokémon...</p>
        ) : (
          <p className="col-span-full text-center">Hier erscheinen bald die Pokémon!</p>
        )}
      </section>
    </main>
  );
}