# Crown Overview Tools v1.0.6

- Adds `getStrategicArmiesForBattle()` to the public module API.
- Exposes the API through both `game.modules.get("crown-overview-tools").api` and `globalThis.CROWN_OVERVIEW_TOOLS`.
- Battle exports include current proportional troop composition, House/player/commander identity, strategic location, and siege equipment.
- Strategic armies are discovered across world scenes, so Battle Tools can read them while a battle Scene is active.
- No Battle import mutates Crown manpower or strategic army state.
