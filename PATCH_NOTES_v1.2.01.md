# Crown Overview Tools v1.2.01 — GM Influence controls

- Adds **GM ± Influence** beside House Influence in the My Realm holdings dialog, with positive or negative whole-number adjustment.
- Uses canonical Influence: **10 base + sum of provincial Influence deltas**, clamped 0–21. Doss at displayed 10 has 10, not zero.
- Shows before/after and requires confirmation; blocks changes outside the 0–21 score range.
- Stores pre-change recovery snapshots in scene flag `world.coaGMInfluenceAdjustments1201`, including the exact original province houseData.
- Does not modify Gold/Food, treasuries, ownership, migration markers, or other House state.
- Influence buildings: active Tier 1 = +1, Tier 2 = +2 total, Tier 3 = +3 total **per collection**; inherited catalog code uses highest active building tier rather than stacking tiers.
- Existing one-time all-House treasury migration guard stays unchanged; no migration rerun.

**Important:** Installing the ZIP alone does not publish the new version to GitHub. GitHub release and main branch manifest must both match v1.2.01 for Foundry auto-updates. Live Foundry interaction testing remains required.
