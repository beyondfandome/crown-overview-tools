# Crown Overview Tools v0.6.7

## What v0.6.7 changes

### Political Overlay — persistent player colours

- Player political colours are now House/owner-wide rather than region-specific
- A player keeps the same political colour everywhere they control land
- Conquering a province in another region therefore paints that revealed province in the conqueror's normal political colour
- Example: if a green player from The Reach takes a Westerlands province, that province shows green once its ownership is visible
- The overlay includes a palette large enough for the current 20–22 player campaign
- Colours are assigned consistently from the player account rather than being recalculated separately inside each region

### Fog-of-war / unrevealed territory

- Political Overlay still respects the existing player visibility system
- A player does not learn exact ownership merely by switching the overlay on
- Unrevealed land uses only its region's generic colour family
- Example: an unrevealed Westerlands province appears in the generic Westerlands red family, regardless of which player currently owns it
- Once the province becomes revealed, its true owner's persistent political colour is shown
- Revealed Neutral / NPC territory uses the dedicated neutral grey colour
- GM continues to see exact political ownership across the full map

### Diplomacy / disembark state repair

- Includes the embark/disembark diplomacy fix from the previous test build
- Characters standing on a land tile are no longer incorrectly treated as still embarked because of stale fleet metadata
- If stale embark / transport flags survive after returning to land, they are automatically cleaned from the character and world-piece data
- Characters genuinely embarked at sea remain blocked from Diplomatic Takeover
- Characters who disembarked during the current turn remain correctly blocked by the same-turn disembark action lock

### Retained v0.6.5 features

- Political Overlay toggle
- Cleaner GM Tile Ownership / House Data editor
- GM direct building-tier override for testing and setup
- Reorganised player and GM control panels
- Round Clock remains promoted near the top of the GM controls

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.7.js
- styles/crown-overview-tools.css
