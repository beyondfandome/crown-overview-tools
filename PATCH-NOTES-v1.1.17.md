# Crown Overview Tools v1.1.17

## Strict Political Overlay fog-of-war hotfix

This release is a narrow visibility hardening patch on top of v1.1.16.

- For non-GM users, Crown's visibility manager `revealedEntries` is now the **sole authority** for which provinces may receive Political Overlay graphics.
- An unseen province receives **no overlay geometry at all**: no player colour, neutral grey, regional fallback, border, or silhouette.
- The Political Overlay no longer independently adds explicitly-owned provinces to its visible set. Owned/current/linked provinces appear only when Crown's normal visibility system has already placed them in `revealedEntries`.
- Political Overlay redraw is now called directly whenever Crown recalculates or clears `revealedEntries`, preventing stale political colours from lingering after the player's visible province set changes.
- GMs retain the complete Political Overlay across all land provinces.
- Seen provinces retain the v1.1.16 deterministic player colours and political-controller/allegiance resolution.
- v1.1.16's Foundry v14 renderer and all boxed v1.1.15 economy, military, raiding, movement, Port, realm-resolution, map-label, and Battle Army Tools behavior are otherwise unchanged.
