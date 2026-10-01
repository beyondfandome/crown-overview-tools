# Crown Overview Tools v1.1.24

## Political Allegiance Authority Hotfix

This release fixes a contradictory legacy-state bug where a province could visibly belong to a player House in the political overlay while the same province was rejected by tooltip permissions, Holdings, mustering, and upkeep.

### Fixed

- A meaningful current political `allegiance` now overrides stale local `ownershipType: Neutral` / `NPC` metadata.
- Explicit current player controller remains strongest, followed by sworn-to-player control, then political House allegiance.
- A province is treated as truly neutral when its current allegiance is `Neutral`, `Unaligned`, `Independent`, `NPC`, or `None`, or when it has no allegiance and its remaining local metadata is explicitly neutral.
- The GM **Make Territory Neutral / Unaligned** action remains authoritative because it writes `Allegiance: Unaligned` and clears player/sworn ownership.
- The corrected political-state decision is shared by province detail visibility, My Holdings/realm membership, manpower/mustering, economy ownership, and military-upkeep stockpile resolution.

### Preserved

- v1.1.23 controller alias and House-name normalization.
- v1.1.22 TokenDocument-safe military-upkeep scanning.
- v1.1.21 GM Province Edit Mode.
- v1.1.20 negative-upkeep Influence loss and levy over-cap attrition.
- v1.1.19 political intelligence memory.
