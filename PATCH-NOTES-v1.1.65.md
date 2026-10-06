# Crown Overview Tools v1.1.65

Performance-focused pass with no intended rules changes.

- Cache the real province Drawing list, tile-id/name lookup maps, normalized polygon geometry, and province bounding boxes instead of rebuilding them on repeated mouse/token checks.
- Province hit-testing now rejects by cached bounding box before doing polygon math, and overlap priority is sorted once when the cache is built.
- Province hover, route tooltip, and world-piece tooltip are event-driven and requestAnimationFrame-throttled instead of polling several times per second while the player is idle.
- Player LOS/reveal redraws are skipped when token movement does not actually change the set of revealed provinces.
- World-piece visibility checks use stored currentTileId against the reveal set before falling back to geometry.
- Drawing suppression uses the cached Crown province/label lists and its fallback safety pass is reduced to every 5 seconds on players / 2 seconds on GMs.
- Province cache invalidates on Drawing create/update/delete and canvas changes so editing remains current.
- Correct module/runtime version metadata and release download URL to v1.1.65.
