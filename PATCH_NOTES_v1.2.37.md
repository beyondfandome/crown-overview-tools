# Crown Overview Tools v1.2.37 — Location synchronization hardening

- Shared current-token province lookup now trusts physical coordinates, not stale saved IDs.
- Spread/formation lookup no longer falls back to stale saved tile IDs.
- Character realm-location inference now checks physical location first.
- GM-side debounced location reconciliation for character, army and fleet token movement and location-flag updates, with a single active-GM writer and recursion guard.
- Character token and actor location flags are synchronized when a valid physical province is identified.
- Preserves province ownership, local houses, resources and existing diplomacy history.

Limitations: Movement outside all mapped provinces is left unchanged rather than guessing a destination. This patch has passed JavaScript syntax validation but has not been runtime-tested in Foundry. Remaining feature-specific legacy location checks should be monitored in gameplay.
