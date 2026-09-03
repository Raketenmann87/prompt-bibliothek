// Der Prompt, der auf der Startseite ganz oben hervorgehoben wird.
// Hier steht die id eines Eintrags aus der Liste weiter unten.
export const promptDesTages = "mail-freundlicher";

export type Prompt = {
  id: string;
  titel: string;
  beschreibung: string;
  text: string;
};

export const prompts: Prompt[] = [
  {
    id: "kurz-zusammenfassen",
    titel: "Auf das Wesentliche kürzen",
    beschreibung: "Macht aus einem langen Text fünf Punkte, die man vorlesen kann.",
    text: "Fasse den folgenden Text in höchstens fünf Stichpunkten zusammen. Jeder Punkt steht für sich und ist ohne den Originaltext verständlich. Verzichte auf Einleitung und Schlusswort.",
  },
  {
    id: "risiken-finden",
    titel: "Risiken finden",
    beschreibung: "Sucht in einem Vorhaben nach dem, was schiefgehen kann.",
    text: "Lies den folgenden Text als Beschreibung eines Vorhabens. Nenne die drei Risiken, die am wahrscheinlichsten dazu führen, dass es scheitert. Sag zu jedem Risiko, woran man früh erkennen würde, dass es eintritt.",
  },
  {
    id: "mail-freundlicher",
    titel: "Eine Absage freundlicher formulieren",
    beschreibung: "Behält die Aussage, ändert den Ton.",
    text: "Formuliere die folgende Nachricht freundlicher, ohne die Aussage abzuschwächen. Die Absage muss eine Absage bleiben. Antworte nur mit der neuen Fassung.",
  },
  {
    id: "einwaende-vorwegnehmen",
    titel: "Einwände vorwegnehmen",
    beschreibung: "Sagt dir, was in der Sitzung als Erstes gefragt wird.",
    text: "Lies den folgenden Vorschlag. Nenne die fünf Einwände, die in einer Leitungsrunde am ehesten kommen, und formuliere zu jedem eine sachliche Antwort in höchstens drei Sätzen.",
  },
  {
    id: "fuer-laien-erklaeren",
    titel: "Für Laien erklären",
    beschreibung: "Übersetzt Fachsprache in Sätze, die jeder versteht.",
    text: "Erkläre den folgenden Text so, dass ihn jemand ohne Fachkenntnisse versteht. Behalte alle Aussagen bei, ersetze aber Fachbegriffe durch geläufige Wörter. Wo ein Fachbegriff nötig bleibt, erkläre ihn beim ersten Vorkommen in einem Halbsatz.",
  },
  {
    id: "naechster-schritt",
    titel: "Den nächsten Schritt finden",
    beschreibung: "Macht aus einem Wust von Notizen eine einzige Aufgabe.",
    text: "Lies die folgenden Notizen. Nenne genau eine Sache, die als Nächstes getan werden sollte, und begründe in zwei Sätzen, warum gerade diese. Nenne außerdem, wer sie tun müsste.",
  },
  // Neue Prompts werden hier unten angehängt.
];

export function findePrompt(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}
