import Link from "next/link";

export const metadata = {
  title: "Impressum | Mein Pokédex",
};

export default function Impressum() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-10">
      {/* Hintergrund-Deko (wie auf der Hauptseite, für den gleichen Look) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-[800px] w-full mt-12 bg-slate-800/30 p-8 rounded-2xl border border-white/10 shadow-2xl">
        <Link 
          href="/" 
          className="text-red-500 hover:text-red-400 font-bold mb-8 inline-block transition-colors"
          style={{ fontFamily: 'Atma, sans-serif' }}
        >
          ← Zurück zum Pokédex
        </Link>

        <h1 
          className="text-5xl font-bold mb-8 tracking-wider drop-shadow-lg"
          style={{ fontFamily: 'Atma, sans-serif' }}
        >
          Impressum
        </h1>

        <div className="space-y-6 text-lg text-slate-200" style={{ fontFamily: 'Atma, sans-serif' }}>
          <section>
            <p className="font-bold">Angaben gemäß § 5 DDG</p>
            <p className="mt-2">
              Ronny Pollmer - Softwareentwickler<br />
              Unterfeldstr. 8 <br />
              85290 Geisenfeld<br />
              Deutschland<br />
              +49 173 8141417
            </p>
          </section>

          <section>
            <p className="font-bold">Vertreten durch:</p>
            <p>Ronny Pollmer</p>
          </section>

          <section>
            <p className="font-bold">Kontakt:</p>
            <p>
              E-Mail:{" "}
              <a href="mailto:career@ronny-pollmer.com" className="text-red-400 hover:underline">
                career@ronny-pollmer.com
              </a>
            </p>
          </section>

          <div className="pt-10 border-t border-white/10 text-sm text-slate-400">
            Impressum von{" "}
            <a href="https://websitewissen.com" className="hover:text-white underline">WebsiteWissen.com</a>, 
            dem Ratgeber für{" "}
            <a href="https://websitewissen.com/wordpress-website-erstellen" className="hover:text-white underline">WordPress-Websites</a>,{" "}
            <a href="https://websitewissen.com/wordpress-hosting-vergleich" className="hover:text-white underline">WordPress-Hosting</a>{" "}
            und{" "}
            <a href="https://websitewissen.com/website-kosten" className="hover:text-white underline">Website-Kosten</a>{" "}
            nach einem Muster von{" "}
            <a href="https://www.kanzlei-hasselbach.de/" className="hover:text-white underline">Kanzlei Hasselbach Rechtsanwälte</a>.
          </div>
        </div>
      </div>
    </main>
  );
}