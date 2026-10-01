# Crown Overview Tools v1.1.15

## Boxed / stable consolidation release

This release is the consolidation point for the restored Crown Overview Tools ruleset. It is based on the packaged v1.0.16 release and retains the economy, warfare, movement, realm-ownership, map-visual, and Battle Army Tools repairs from v1.0.11-v1.0.16.

## Final audit hardening

- Economy collection is now protected **per province, per round**, not merely by the selected GM collection scope. A province reached through Collect All, Collect Player, or Collect Selected cannot receive its income twice in the same round unless the GM explicitly uses Force collect.
- Reset Economy Ledger also clears the province-level collection markers so deliberate testing/corrections still work.
- The one-collection raid penalty remains consumed exactly once, including the zero-income edge case, and cannot become a permanent income penalty.
- Port destination permission now resolves political ownership through explicit controller data, sworn-player data, and unique player-House allegiance. A Port does not become effectively unowned merely because its legacy explicit owner fields are blank.
- Port Crossing continues to spend all remaining movement and synchronize character Wounds to world-piece, world-character, and Actor data.
- Siege/raid opposition checks now prefer the force's live assigned commander/controller over stale force owner fields.
- Siege ownership checks prefer political allegiance over the preserved local/original House name, preventing a conquered/sworn province from being treated as hostile to its own realm merely because its historical House identity remains intact.
- The v0.5.11 `originalHouseName` first-transfer safeguard is restored for non-generic local Houses.
- GM force-dismissal validation now uses the same live military controller resolution.
- Trade now verifies that the World Round Clock exists **before** debiting the sender, preventing a failed unscheduled shipment from removing resources.
- Holdings Development display now uses the same physical-piece compatibility calculation as the rules, including legacy saves that stored only a highest-tier building name.

## Retained economy and development

- Maximum Development remains **4 physical building pieces per province**; upgrades consume another slot.
- Development Statecraft requirements remain **5 / 10 / 12 / 16**.
- Construction costs remain **5 / 15 / 30 Gold** and construction timing remains **1 / 2 / 3 rounds** by tier.
- Building effects use the highest active tier in a normal line; the Foundry specialist bonuses remain the explicit cumulative exception.
- Resource specialization remains mutually exclusive from Tier I among Fields, Mines, Pastures, and Fisheries.
- Tier 2-6 trade-good rebalance remains intact, including no Tier 1 goods, the six Tier 6 crown resources, and Westerland Reds.
- Market exports remain: no Market **100% / 50%**, Town Square **100% / 100%**, Market Square **150% / 150%**, Trading Hall **250% / 250%**, with no flat Market income.
- Demolition removes the entire line, frees its Development pieces immediately, and reports removed income.

## Retained warfare, movement, and realm systems

- Army/navy upkeep uses the v0.6.31 values, recalculates from surviving forces, resolves the live player realm, and is protected by a per-House/per-round upkeep ledger.
- Raids retain opposing-army blocking, 25/50/75/100% outcomes, current tile income, cavalry double carry capacity, and the one-round income penalty lifecycle.
- Roads reduce land entry cost by **0.5**. Enemy Watchtowers/Holdfasts/Castles add **+0.5 / +1 / +1.5**. Pathfinding and actual movement use the same calculation.
- Independent characters remain Movement 3; armies remain base Movement 2; attached commanders share the army's movement pool.
- Trade still leaves immediately and arrives on the next round. Bank loans remain 1-30 Gold, 20% total interest, due in 3 rounds, with Dishonorable characters barred and default adding 10%/one round.
- Player-House discovery remains dynamic for House Gold/Food adjustment, economy, trade/bank pools, raid loot, Holdings, mustering, upkeep, and Port ownership.
- Province conquest preserves the local/original House while changing political allegiance/controller.

## Retained integration and map behavior

- Clean province rendering / hidden province Drawing lines remain active.
- GM **Move Tile Names / Finish Moving Tile Names** remains available.
- Assigned-character Foundry OWNER repair remains available and runs quietly on overview-scene load for the GM.
- `getStrategicArmiesForBattle()` remains exposed through both the module API and `globalThis.CROWN_OVERVIEW_TOOLS` for Battle Army Tools.
- Release updater metadata points to the v1.1.15 GitHub ZIP while preserving the existing repository and manifest URLs.
