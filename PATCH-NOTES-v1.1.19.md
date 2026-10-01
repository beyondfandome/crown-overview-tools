# Crown Overview Tools v1.1.19

## Political Intelligence Memory

- Adds per-player **last-known political ownership** without changing authoritative province data.
- A province the player has **never seen** has no political overlay geometry in that player's memory layer.
- A province the player can **currently see** shows the current round's political snapshot at normal overlay strength.
- When the province leaves Crown visibility, the player retains a **faded last-known owner colour**.
- If ownership changes while the province is unseen, that player's remembered colour stays stale until they personally see the province again.
- Re-entering vision refreshes the remembered owner/House and observation round for that player.
- Political memory is stored on the viewing Foundry User under the module's own flag namespace; it is not stored on provinces/Houses and cannot grant vision or change world state.
- The expensive political map remains a **once-per-strategic-round snapshot**. Visibility changes only update the current-vision mask. Learning or refreshing a province updates at most that one remembered province graphic; there is no full political redraw.
- The current-politics snapshot contains the whole land map but is clipped by Crown's live visibility mask for non-GMs, so newly visible territory can reveal its current snapshot colour immediately without rebuilding the map.
- Remembered politics are rendered separately beneath current politics. Never-seen territory is absent from the memory layer.
- GM political overlay remains complete and does not use player memory.
- v1.1.18 performance safeguards and boxed v1.1.15 economy/military/raiding/movement systems are otherwise unchanged.
