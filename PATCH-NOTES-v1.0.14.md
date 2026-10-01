# Crown Overview Tools v1.0.14

## Roads and Fortifications now affect movement
- Activates the long-documented Road movement rule: an active **Road** reduces movement cost to enter that province by **0.5**.
- Activates hostile Fortification movement penalties: **Watchtowers +0.5**, **Holdfasts +1.0**, **Castles +1.5** movement cost to enter the province.
- Friendly fortifications do not increase movement cost. Political/controller ownership is authoritative, with realm allegiance/House used as a legacy fallback. This preserves conquered provinces whose local House name differs from their controlling realm.
- Road and hostile Fortification modifiers stack on the same province. Example: a base-cost 1 province with a Road and an enemy Castle costs `1 - 0.5 + 1.5 = 2` movement to enter.
- These are land-movement rules: they apply to **armies and characters**, not fleets or dragons.
- The same shared movement-cost function is used by Dijkstra route-finding and by actual per-tile movement expenditure, preventing displayed/selected route costs from disagreeing with the amount charged.
- Only completed/active buildings apply; buildings still under construction do not affect movement.

## Retained
- Retains all v1.0.13 regression-audit restorations: Port permission/full-movement/Wound sync, raid cleanup, GM House resource adjustment, Foundry specialist capacity, highest-tier military training rules, demolition income reporting, and Battle Army Tools owner fallback repair.
- Retains the v1.0.12 economy restoration and v1.0.11 clean-map / Move Tile Names behavior.

## Design note
- This release does not otherwise rebalance Roads or Fortifications. It connects their already-documented movement values to the live movement system.
