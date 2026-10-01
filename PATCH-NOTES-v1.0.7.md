# Crown Overview Tools v1.0.7

## Province selection / character control
- Adds **Province Highlights: On/Off** to Player: View Tools for both players and GMs.
- Turning it off disables hover highlighting and world-tile Drawing hit targets without changing province data, allowing character/world-piece tokens underneath to be selected.
- Turning it back on restores province Drawing interaction for map editing.
- This setting is client-local.

## Assigned character ownership
- Character assignment keeps Crown owner fields and Foundry Actor ownership synchronized.
- Assigned players receive Foundry **OWNER** permission on their character Actor.
- Adds GM **Repair Assigned Character Control** for legacy/existing characters.
- On overview-scene load, the GM quietly repairs resolvable existing character assignments.

## Battle Army Tools integration
- Preserves `getStrategicArmiesForBattle()` through both the module API and `globalThis.CROWN_OVERVIEW_TOOLS`.
- Army export remains a read-only snapshot with army/house/player/commander identity, current/max strength, scaled troop composition, siege equipment, and strategic location.
