# Crown Overview Tools v0.6.8

## What v0.6.8 changes

- Fixed a province-transfer code error affecting successful Diplomatic Takeover attempts

- Successful diplomacy could reach the ownership-transfer stage and then fail with:
  `isGenericNeutralLocalHouse is not defined`

- Restored the missing helper used to determine whether a province has a generic Neutral / NPC local House identity

- Generic Neutral / NPC holdings can now correctly adopt the conquering House as their public political identity

- Named local Houses continue to preserve their local House identity while changing political allegiance / controller

- Because the same province-transfer function is also used by successful sieges, this fix also protects Siege / Storm conquest from the same undefined-function error

- The diplomacy roll and normal diplomatic restrictions were not the cause of the error
- The failure happened only when the module tried to apply a successful ownership transfer

- All v0.6.7 features remain included:
  persistent player colours across regions
  fog-safe regional colours for unseen territory
  diplomacy embark / disembark state repair
  political overlay
  cleaner GM building editor
  reorganised player and GM panels

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.8.js
- styles/crown-overview-tools.css
