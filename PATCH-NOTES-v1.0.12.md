# Crown Overview Tools v1.0.12

## Economy restoration
- Restores the finalized v0.6.30 Tier 2-6 trade-good rebalance. Tier 1 is intentionally unused.
- Restores the six Tier-6 crown resources: Fireplums, Highland Cows, Fermented Crab, Unicorn Horn, Jewels, and Weirwood Bows.
- Preserves the later Westerland Reds trade good at 5 Gold / 0 Food.
- Existing provinces whose saved trade-good values exactly match the regressed legacy catalog are upgraded at runtime to the restored catalog values; deliberate custom values remain custom.
- Restores building construction costs to 5 / 15 / 30 Gold for Tier I / II / III.
- Restores the v0.6.34 Market model: no Market = 100% primary / 50% secondary; Town Square = 100% / 100%; Market Square = 150% / 150%; Trading Hall = 250% / 250%. Market buildings provide no flat Gold/Food income.
- Market multipliers stack with seasonal Market Forces category modifiers.
- Restores v0.6.31 army upkeep per 500 troops and naval upkeep per 5 ships.

## Retained
- Retains v1.0.11 automatic clean province geometry and clean tile-name labels.
- Retains the GM-only Move Tile Names toggle.
- Retains current raiding, banking, trade timing, demolition, port travel, movement, character control, and Battle Army Tools integration.
