"use client";

// Eingabefeld und Absendeknopf für einen Prompt.
//
// Was hier noch fehlt: eine Anzeige, solange das Modell antwortet. Der Zustand
// `laedt` ist vorhanden und schaltet den Knopf ab, aber man sieht nicht, dass
// im Hintergrund etwas passiert. Bei längeren Texten wirkt die Seite tot.

import { useState } from "react";
import Ergebnis from "./Ergebnis";

type Props = {
  promptId: string;
};

export default function PromptFormular({ promptId }: Props) {
  const [eingabe, setEingabe] = useState("");
  const [ergebnis, setErgebnis] = useState<string | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);
  const [laedt, setLaedt] = useState(false);

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    setLaedt(true);
    setFehler(null);
    setErgebnis(null);

    try {
      const antwort = await fetch("/api/ausfuehren", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId, eingabe }),
      });
      const daten = await antwort.json();

      if (!antwort.ok) {
        setFehler(daten.fehler ?? "Unbekannter Fehler.");
      } else {
        setErgebnis(daten.ergebnis);
      }
    } catch {
      setFehler("Die Anfrage konnte nicht gesendet werden.");
    } finally {
      setLaedt(false);
    }
  }

  return (
    <>
      <form onSubmit={absenden} className="mt-9">
        <label
          htmlFor="eingabe"
          className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-cyan"
        >
          Dein Text
        </label>
        <textarea
          id="eingabe"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          rows={9}
          placeholder="Text hier einfügen"
          className="w-full resize-y rounded-xl border border-neonpink/25 bg-nacht/60 p-4 text-[15px] leading-relaxed text-hell outline-none transition placeholder:text-gedaempft/50 focus:border-cyan focus:shadow-[0_0_0_3px_rgba(34,230,245,0.18)]"
        />
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={laedt || eingabe.trim() === ""}
            className={
              "rounded-full px-9 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white transition " +
              (laedt
                ? "miami-laeuft cursor-progress"
                : "bg-gradient-to-r from-magenta via-neonpink to-violett shadow-[0_0_28px_-4px_rgba(255,46,139,0.85)] hover:brightness-110 disabled:cursor-not-allowed disabled:bg-none disabled:bg-hell/10 disabled:text-gedaempft/60 disabled:shadow-none")
            }
          >
            {laedt ? (
              <span className="inline-flex items-center gap-2.5">
                läuft
                <span className="inline-flex gap-1" aria-hidden="true">
                  <span className="miami-punkt" />
                  <span className="miami-punkt" />
                  <span className="miami-punkt" />
                </span>
              </span>
            ) : (
              "Prompt ausführen"
            )}
          </button>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-gedaempft/70">
            {eingabe.trim() === "" ? "Erst Text einfügen" : `${eingabe.length} Zeichen`}
          </span>
        </div>
      </form>

      {laedt && (
        <section className="mt-10" role="status" aria-live="polite">
          <div className="horizont" />
          <h2 className="neon-cyan mt-5 text-xs font-bold uppercase tracking-[0.24em]">
            Antwort entsteht
          </h2>
          <div className="mt-4 rounded-xl border border-cyan/20 bg-nacht/50 p-6">
            <div className="animate-pulse space-y-3" aria-hidden="true">
              <div className="h-3 w-full rounded-full bg-gradient-to-r from-cyan/25 to-violett/25" />
              <div className="h-3 w-11/12 rounded-full bg-gradient-to-r from-cyan/25 to-violett/25" />
              <div className="h-3 w-full rounded-full bg-gradient-to-r from-cyan/25 to-violett/25" />
              <div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-cyan/25 to-violett/25" />
            </div>
            <span className="sr-only">Das Modell erzeugt gerade eine Antwort.</span>
          </div>
        </section>
      )}

      {fehler && (
        <p className="mt-8 rounded-xl border border-magenta/50 bg-magenta/10 px-5 py-4 text-[15px] leading-relaxed text-neonpink">
          {fehler}
        </p>
      )}

      {ergebnis && <Ergebnis text={ergebnis} />}

      <style jsx>{`
        /* Miami Vice: Neonverlauf wandert durch den Knopf, dazu ein Glühen,
           das zwischen Magenta und Cyan atmet. */
        .miami-laeuft {
          background-image: linear-gradient(
            90deg,
            #ff2e8b,
            #ff6bc1,
            #8b41ff,
            #22e6f5,
            #8b41ff,
            #ff6bc1,
            #ff2e8b
          );
          background-size: 300% 100%;
          animation:
            miami-flow 6s linear infinite,
            miami-glow 4.2s ease-in-out infinite;
        }

        @keyframes miami-flow {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: 300% 50%;
          }
        }

        @keyframes miami-glow {
          0%,
          100% {
            box-shadow:
              0 0 22px -6px rgba(255, 46, 139, 0.9),
              0 0 44px -14px rgba(34, 230, 245, 0.5);
          }
          50% {
            box-shadow:
              0 0 34px -2px rgba(34, 230, 245, 0.95),
              0 0 64px -8px rgba(255, 46, 139, 0.7);
          }
        }

        /* Drei Punkte, die nacheinander aufleuchten. */
        .miami-punkt {
          display: inline-block;
          width: 0.375rem;
          height: 0.375rem;
          border-radius: 9999px;
          background: #ffffff;
          animation: miami-punkt 2.4s ease-in-out infinite;
        }

        .miami-punkt:nth-child(2) {
          animation-delay: 0.4s;
        }

        .miami-punkt:nth-child(3) {
          animation-delay: 0.8s;
        }

        @keyframes miami-punkt {
          0%,
          100% {
            opacity: 0.25;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
          }
        }

        /* Wer im Betriebssystem weniger Bewegung eingestellt hat, bekommt sie nicht. */
        @media (prefers-reduced-motion: reduce) {
          .miami-laeuft,
          .miami-punkt {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
