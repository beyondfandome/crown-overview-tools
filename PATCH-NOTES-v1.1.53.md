# Crown Overview Tools v1.1.53

- Fixes stray/new province-line artifacts that could appear after the v1.1.52 player performance changes.
- Normal-play province suppression now hides the rendered Drawing shape/stroke child as well as the placeable container and controls.
- Restores a lightweight player-side suppression safety pass at 750ms (GM: 1000ms), instead of the old 100ms full-Drawing polling loop.
- Preserves the v1.1.52 tile-label exclusion fix, so tile-name Drawings still cannot act as fake provinces.
