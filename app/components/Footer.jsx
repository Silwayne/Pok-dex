import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-10 border-t border-white/10 bg-slate-950/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Pokédex Projekt. Alle Rechte vorbehalten.
        </p>
        
        <div className="flex gap-8">
          <Link href="/impressum" className="text-slate-400 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">
            Impressum
          </Link>
          <Link href="/datenschutz" className="text-slate-400 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}