// Russian typography for line breaks. Words stay the same; only spaces change:
// a dash stays with the word before it, and short prepositions, conjunctions
// and "не" stay with the word after them. So no line starts with a dash
// and no line ends with a hanging "в", "а не" and the like.
// Agreed with the owner on 2026-10-20 as a deliberate departure from the mockup.

const NBSP = String.fromCharCode(160); // non-breaking space

// A short word followed by a space; the lookbehind keeps chains like "а не просто" together.
const SHORT_WORD = /(?<=^|[\s«(])(в|во|и|о|об|а|с|со|к|ко|у|не|ни|на|за|по|до|из|от|но) /giu;

export function typograph(text: string): string {
  return text.replace(/ —/g, `${NBSP}—`).replace(SHORT_WORD, `$1${NBSP}`);
}

// Applies typograph to every string inside a texts object.
export function typographAll<T>(value: T): T {
  if (typeof value === "string") return typograph(value) as T;
  if (Array.isArray(value)) return value.map((item) => typographAll(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, typographAll(item)]),
    ) as T;
  }
  return value;
}
