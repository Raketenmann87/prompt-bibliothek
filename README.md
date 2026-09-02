# Prompt-Bibliothek

Eine kleine Sammlung von Prompts für die tägliche Arbeit. Man wählt einen aus,
fügt seinen eigenen Text ein und lässt beides über ein Sprachmodell laufen.

Oben auf der Startseite steht ein hervorgehobener Prompt des Tages, darunter
die vollständige Liste.

## Aufbau

| Ort | Was darin liegt |
|---|---|
| `data/prompts.ts` | Die Sammlung und die Angabe, welcher Prompt oben steht |
| `app/page.tsx` | Startseite mit Empfehlung und Liste |
| `app/prompt/[id]/page.tsx` | Detailseite mit Eingabefeld |
| `app/api/ausfuehren/route.ts` | Ruft das Sprachmodell auf |
| `components/PromptFormular.tsx` | Eingabefeld und Absendeknopf |
| `components/Ergebnis.tsx` | Zeigt die Antwort an |

## Zugang zum Sprachmodell

Die Anwendung spricht mit EUrouter. Dafür wird ein API-Schlüssel gebraucht, und
zwar ein eigener je Person. Er gehört in eine Datei namens `.env.local` im
Projektordner. Als Vorlage liegt `.env.example` daneben.

In derselben Datei steht auch, welches Modell benutzt wird. Bleibt das Feld leer,
nimmt die Anwendung `mistral-large-3`.

Ohne Schlüssel startet die Anwendung, aber das Ausführen eines Prompts endet mit
einer Meldung.

## Installation

Noch nicht dokumentiert.

## Was noch fehlt

- Ein Kopieren-Knopf unter dem Ergebnis. Im Moment muss man den Text mit der
  Maus markieren.
- Eine Anzeige, solange das Modell antwortet. Bei längeren Texten wirkt die
  Seite tot.
- Mehr Prompts in der Sammlung. Drei sind zu wenig.
- Ein Suchfeld über der Liste, sobald mehr als zehn Prompts darin stehen.
- Eine ordentliche Installationsanleitung.

## Lizenz

MIT, siehe [LICENSE](LICENSE).
