# Crown Overview Tools v1.1.27

## Player Political Overlay reliability hotfix

- Fixes a player-client failure where the Political Overlay could be enabled but render nothing because Crown's existing visibility manager returned without recalculating `revealedEntries` after imports, scene refreshes, or canvas rebuilds.
- `startVisibility()` now refreshes the current player's Crown reveal set whenever the visibility manager already exists instead of silently returning with stale/empty reveal data.
- Enabling or restarting the Political Overlay now refreshes player reveal data before applying the overlay visibility mask.
- Political Overlay containers are now defensively re-mounted under Foundry v14's `InterfaceCanvasGroup` whenever a canvas/group rebuild leaves an existing overlay attached to a stale parent.
- The overlay is assigned a stable low interface `zIndex` and remains non-interactive, keeping political colours above the world canvas but behind normal interface children.
- Non-GM clients receive one delayed visibility/overlay refresh after `canvasReady` so token ownership and imported character/province data have time to hydrate before the first player mask is finalized.
- Fog-of-war rules remain unchanged: current political colours are still clipped to Crown's live player visibility, and political-memory behavior remains last-known information only.
- v1.1.26 player UI, economy, military, marriage, import/export, and updater behavior are otherwise unchanged.
