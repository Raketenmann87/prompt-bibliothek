"use client";

import { useState } from "react";

type Props = {
  text: string;
};

export default function Ergebnis({ text }: Props) {
  const [kopiert, setKopiert] = useState(false);

  async function kopieren() {
    await navigator.clipboard.writeText(text);
    setKopiert(true);
    setTimeout(() => setKopiert(false), 2000);
  }

  return (
    <section className="mt-10">
      <div className="horizont" />
      <h2 className="neon-cyan mt-5 text-xs font-bold uppercase tracking-[0.24em]">
        Ergebnis
      </h2>
      <p className="mt-4 whitespace-pre-wrap rounded-xl border border-cyan/30 bg-nacht/50 p-6 text-[15px] leading-relaxed text-hell/90">
        {text}
      </p>
      <button
        onClick={kopieren}
        className="mt-3 rounded-lg border border-cyan/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan hover:bg-cyan/10"
      >
        {kopiert ? "Kopiert" : "Text kopieren"}
      </button>
    </section>
  );
}
