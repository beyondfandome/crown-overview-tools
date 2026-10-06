# Crown Overview Tools v1.1.41

- Characters can no longer evade diplomacy Culture/Religion modifiers by leaving those fields blank.
- On GM load, characters missing Culture and/or Religion receive a persistent region-appropriate assignment.
- Assignments are stable per character and saved to token/actor flags.
- Existing province Culture/Religion is strongly favored when available; otherwise regional pools are used.
- Valyraboo characters with blank Culture are assigned High Valyrian.
- Standard Faith of the Seven assignments preserve the ~30% ordinary sect distribution.
- Culture aliases are normalized: First Man -> First Men; Crannogmem -> Crannogmen; Iron Man -> Ironborn; Free Folk -> Wildling.
- The built-in Culture list now uses the campaign's granular regional cultures.
- Diplomacy resolution performs a final identity check and auto-fills missing fields before calculating modifiers.
- Saving Edit Details with a blank Culture or Religion auto-fills the missing field instead of storing a blank.
