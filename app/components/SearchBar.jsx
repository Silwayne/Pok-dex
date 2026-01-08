"use client";

const BASE_COLORS = {
  grass: "#087708", fire: "#FF0000", water: "#0000FF", bug: "#90EE90",
  normal: "#69695F", poison: "#810A81", electric: "#FFFF00", ground: "#A62C2C",
  fairy: "#D480CF", fighting: "#FFA602", psychic: "#E55A74", rock: "#808080",
  ghost: "#483D8B", ice: "#68BAAC", dragon: "#253152", dark: "#000000",
  steel: "#C0C0C0", flying: "#87B5E5",
};

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="sticky top-0 z-[100] w-full py-4 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        
        <input 
          type="text" 
          style={{ fontFamily: 'Atma, sans-serif' }}
          placeholder="Pokémon suchen..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-2xl p-3 rounded-xl bg-slate-800/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-white text-lg shadow-inner"
        />

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center w-full px-2">
          <button 
            onClick={() => setSearchTerm("")} 
            className={`min-w-[60px] h-10 rounded-xl font-bold border transition-all text-sm ${searchTerm === "" ? 'bg-white text-slate-900 border-white' : 'bg-slate-800/50 text-slate-400 border-white/10'}`}
          >
            Alle
          </button>
          
          {Object.keys(BASE_COLORS).map((type) => (
            <button 
              key={type} 
              onClick={() => setSearchTerm(type)} 
              style={{ 
                backgroundColor: searchTerm.toLowerCase() === type ? BASE_COLORS[type] : 'rgba(30, 41, 59, 0.4)', 
                borderColor: BASE_COLORS[type] 
              }} 
              className="min-w-[45px] h-10 rounded-xl border-2 transition-all hover:scale-110 flex items-center justify-center shadow-lg"
            >
              <img src={`/Pokedex/images/${type}.png`} alt={type} className="w-6 h-6 object-contain" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}