# Crown Overview Tools v1.0.13

## Regression audit restoration
- Restores v1.0.0 Port Travel destination permission for another player’s Port. The destination owner can Allow/Deny the specific attempt; an active GM is used as fallback if the owner is offline. Denied/timed-out requests spend no movement, make no crossing roll, and do not teleport. Approval/denial is recorded in chat.
- Restores v1.0.3 Port Crossing movement: a crossing consumes all remaining movement for the round.
- Restores v1.0.3 character Wound synchronization after a natural 10 Port Crossing roll to the world-piece flag, world-character token flag, and underlying Actor flag.
- Restores attached army/commander travel synchronization during Port Crossing.
- Restores v1.0.1 one-collection raid cleanup, including the zero-income edge case.
- Restores v1.0.2 GM **Adjust House Gold / Food** with before/after chat audit and removal capped at the current realm stockpile.
- Restores v1.0.3 Foundry specialist training capacity: +100 Light Infantry at Foundry, +100 Crossbowmen at Blacksmith, +100 Lancers at Armorer; bonuses are cumulative across completed physical pieces.
- Corrects trained-unit capacity to the v0.6.24 highest-active-tier rule for Barracks, Archery, and Stable lines instead of accidentally summing lower physical tiers after an upgrade.
- Restores v0.6.33 demolition chat reporting of Gold/Food income removed per round.
- Corrects Battle Army Tools export fallback fields to use `playerOwnerUserId` / `playerOwnerUserName`.

## Retained
- Retains the full v1.0.12 economy restoration: Tier 2-6 trade goods, 5/15/30 construction, v0.6.34 Markets, v0.6.31 army/navy upkeep, and Westerland Reds.
- Retains v1.0.11 clean province rendering and GM Move Tile Names mode.
- Retains resource-building exclusivity, piece-based Development/Statecraft, raiding/cavalry carry capacity, trade delivery timing, banking, demolition permissions, movement pairing, Round Clock order, assigned-character ownership repair, CSV custom trade goods, and Battle Army Tools live API.

## Audit note
- Two older documented movement effects remain separate from this regression-restoration patch because they were already absent in the bundled v0.6.29 implementation rather than being later regressions: Road -0.5 movement cost and Watchtower/Holdfast/Castle enemy movement-cost increases.
