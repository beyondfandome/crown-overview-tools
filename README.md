# Crown Overview Tools v0.6.5

## What v0.6.5 changes

- Added a Political Overlay toggle to the main panel
- Political Overlay fills owned land tiles with semi-transparent colours
- GM sees the full political map using per-player ownership shades
- Players see owner-specific colours for revealed territory and regional base colours for unrevealed territory
- Neutral / NPC territory uses a consistent grey overlay
- Region colour families are now visually distinct, while different players inside the same region use different shades of that region colour

- Reworked the GM Tile Ownership / House Data editor
- Removed the old wall of building checkboxes
- Buildings are now grouped by Economy, Infrastructure, Military, and Social categories
- Each building line can be set directly to None, Tier 1, Tier 2, or Tier 3 from a dropdown
- The GM editor now bypasses Statecraft requirements so you can jump directly to any building tier for testing or setup
- The normal 4-building-line tile cap is still enforced

- Reorganized the Crown Overview panel
- Round Clock moved much higher in the GM tools so the turn progression controls are easier to reach
- Player actions are now grouped into Characters & Movement, Military & Realm, and View Tools
- GM actions are now grouped into Round Management, Characters & Pieces, Armies / Tiles / Economy, and Map Tools & Maintenance
- Added a Political Overlay button to the player-facing View Tools section

## Notes

- Player fog-of-war behaviour for the Political Overlay uses the existing reveal system: revealed territory shows specific owner shading, while unrevealed territory falls back to a region-colour overlay rather than revealing the exact political owner.
- Neutral / NPC territory keeps its own dedicated grey identity.
- The GM editor is intended as an administrative and testing tool; it can bypass the normal character Statecraft gate that the player Build / Upgrade flow still uses.

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.5.js
- styles/crown-overview-tools.css
