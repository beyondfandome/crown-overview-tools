# v1.2.20 — Stockpile presentation cleanup

- Hide legacy Influence deltas from economy stockpile text, realm overview stockpiles, export rows, and economy editing fields.
- Preserve existing `houseData.resourceStockpile.Influence` values: they still power the House Influence score (base 10), diplomacy, and levy mechanics.
- Protect Influence values on economy editor save, including stockpile edits and deltas.
- No destructive migration, no changes to Gold/Food, and no gameplay rule changes.
- Influence continues to be adjusted using the dedicated House Influence controls.
