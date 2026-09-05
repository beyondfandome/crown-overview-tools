# Crown Overview Tools v0.4.1

Strategic overview-map tools for Foundry VTT Crown of Ashes scenes.

## Included in v0.4.1

- Includes the previously planned v0.4.0 systems, so you can install this directly from v0.3.x.
- Hard fix for Manual Base Resource Income clearing.
  - Clearing the field now stays cleared.
  - Legacy manual income fields are removed on save/repair/import/collection.
- Final 3-tier building catalogue.
  - Normal building lines have Tier 1, Tier 2, Tier 3 only.
  - Roads are one-and-done.
  - Building upgrades replace the previous tier instead of consuming another slot.
  - Tiles keep a four building-line limit.
  - Tier costs: 4 / 12 / 24 Gold.
  - Statecraft requirements: 5 / 10 / 12.
- Buildings now use flat output.
  - Trade goods provide natural Gold/Food income.
  - Buildings no longer receive matching-export bonuses.
  - Mine remains the best pure-gold line.
  - Foundry remains strong at +4/+8/+12 Gold.
  - Stone gives lower Gold plus infrastructure/fortification discounts.
  - Influence buildings provide +1 additional Influence per upgrade tier, shown as 1/2/3 total Influence.
- Create/Edit World Piece now includes optional Statecraft.
- Player visibility improvements.
  - Player-owned holdings reveal like controlled character pieces.
  - Owned holdings reveal their tile plus linked/adjacent tiles.
- Player information privacy.
  - Non-owners see only top-level tile info, owner/ruler, and travel summary.
  - Detailed economy, population, buildings, and stockpiles are hidden unless the player owns the holding or is GM.
  - Non-owned world-piece tooltips hide detailed stats.

## Scene gate

The module runs on:

- Crown of Ashes
- Crown of Ashes (Copy)

Or on scenes explicitly flagged by the module.
