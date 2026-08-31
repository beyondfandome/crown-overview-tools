# Crown Overview Tools v0.3.0

Scene-gated strategic overview map tools for Foundry VTT.

## Included in v0.3.0

- Adds a built-in trade-good catalogue with category, gold value, and food value.
- Adds GM-only **Manage Market Forces** for seasonal category multipliers.
- Adds primary and secondary trade-good selectors to **Manage Tile Economy**.
- Economy collection now includes trade-good Gold/Food output.
- Development now contributes Gold/Food bonuses:
  - Ruins: +1 Food
  - Hamlet / Village: +3 Gold, +2 Food
  - Holdfast: +4 Gold, +2 Food
  - Town: +6 Gold, +1 Food
  - City: +9 Gold, -1 Food
- Building income still starts the round after construction.
- CSV export/import now includes trade-good fields, final trade Gold/Food values, and development economy bonuses.
- Adds economy infrastructure constants for future building trees: economy buildings, roads, military buildings, mustering grounds, influence buildings, and fortifications.
- Piece tooltip moved higher to reduce overlap with tile/location tooltip.
- Keeps v0.2.7 economy repair, holdings, vision, movement, pending builds, and CSV fixes.

## Notes

Trade-good market forces are stored per scene, under the `worldMarketForces` scene flag.
Tile economy and holdings still use the existing `world.houseData` and `world.worldTile` flags so old data remains compatible.
