# Crown Overview Tools — v1.0.16

## Military upkeep repair

- Fixes army/navy upkeep failing when a player's realm is represented by sworn/allegiance data instead of only explicit province owner IDs.
- Uses the same live player-House/realm resolution introduced for Adjust House Gold/Food in v1.0.15.
- Resolves force controllers from explicit force ownership, linked commander/character assignment, Actor ownership, and unique player-House match.
- Recalculates upkeep from current surviving troop/ship strength every round instead of trusting a stale stored upkeep snapshot.
- Keeps a compatibility fallback for old/imported forces that have stored upkeep but no composition.
- Adds a dedicated per-round military-upkeep ledger so Collect All / Collect Player / repeated audits cannot accidentally charge the same realm twice.
- Reset Economy Ledger now clears the military-upkeep ledger too.
- Adds GM **Charge / Audit Military Upkeep** to preview current due upkeep and safely charge only realms not already paid for the current round.
- Economy ledger now records unresolved upkeep counts for easier debugging.

## Retained

- v1.0.15 automatic player-House discovery for GM Gold/Food adjustment.
- v1.0.14 Roads and hostile fortification movement modifiers.
- v1.0.13 Port permissions/costs/Wounds, raid cleanup, Foundry training bonuses, demolition reporting, mustering-chain correction, and Battle Army Tools owner-field repair.
- v1.0.12 restored trade goods, construction costs, Markets, and v0.6.31 army/navy upkeep values.
- v1.0.11 province-line suppression and movable tile-name controls.

## Realm ownership consistency

- Applies the same live controller / sworn-player / allegiance realm resolver to player-scoped economy collection, realm trade/bank resource pools, raid-loot fallback, Holdings display, and player/GM muster realm lookup.
- Port destination ownership lookup now also recognizes sworn-player and unique allegiance ownership when explicit legacy owner fields are absent.
- Existing explicit owner fields remain authoritative when present.
