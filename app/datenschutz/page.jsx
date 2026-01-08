import Link from "next/link";

export const metadata = {
  title: "Datenschutz | Mein Pokédex",
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-10">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
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
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-slate-200" style={{ fontFamily: 'Atma, sans-serif' }}>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-xl font-semibold mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Datenerfassung auf dieser Website</h3>
            <h4 className="font-bold mt-4">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
            </p>
            
            <h4 className="font-bold mt-4">Wie erfassen wir Ihre Daten?</h4>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="mt-2">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="text-xl font-semibold mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
              Ronny Pollmer<br />
              Unterfeldstr. 8<br />
              85290 Geisenfeld<br />
              E-Mail: career@ronny-pollmer.com
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Ihre Rechte</h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
            </p>
          </section>

          <div className="pt-10 border-t border-white/10 text-sm text-slate-400">
            Quelle: <a href="https://www.e-recht24.de" className="hover:text-white underline">https://www.e-recht24.de</a>
          </div>
        </div>
      </div>
    </main>
  );
}