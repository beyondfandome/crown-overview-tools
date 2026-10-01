# Crown Overview Tools v1.1.25

## Persistent Political Controller Sync

This patch integrates the GM test macro that successfully fixed a player being denied full province data for a province their House politically controls.

### What changed

- The GM client derives a unique House-to-player mapping from Crown character tokens.
- For each land province with a meaningful political Allegiance matching a unique player House, Crown persists that player into all supported explicit controller aliases on both `worldTile` and `houseData`:
  - `ownerUserId` / `ownerUserName`
  - `playerOwnerUserId` / `playerOwnerUserName`
  - `controllerPlayerUserId` / `controllerPlayerName`
- The sync runs after the Crown overview canvas loads and after relevant province/character flag changes.
- Neutral/Unaligned/Independent/NPC provinces are explicitly excluded. Preserved local House identity cannot resurrect a neutral province into its former realm.
- Ambiguous House mappings are skipped rather than guessed.
- The sync is guarded/debounced to avoid update-hook recursion.

### Why

The test macro proved that the remaining disagreement was persisted controller identity: political Allegiance could be correct while old controller fields were blank/stale. Once those fields were synchronized, the player could see the full province panel. This patch makes that successful repair automatic and persistent.

### Preserved

No changes were made to the v1.1.24 political-allegiance authority rules, v1.1.21 province edit toggle, v1.1.20 upkeep/Influence/attrition rules, or v1.1.19 political-memory behavior.
