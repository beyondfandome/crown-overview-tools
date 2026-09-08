# Crown Overview Tools v0.6.9

## What v0.6.9 changes

- Fixed successful Diplomatic Takeover not persisting province ownership

- The diplomacy roll could succeed and correctly calculate the new House/controller,
  but the module then saved the old pre-transfer World Tile and House Data objects back to the province

- This caused the verification step to report:
  "Province transfer did not persist world-tile allegiance.
  Expected Greenflame, found Unaligned."

- Successful Diplomatic Takeover now replaces the local tile/House working data
  with the transferred ownership data before saving

- A successful takeover now persists:
  new political allegiance
  new player controller
  Player ownership type
  public owner label
  ownership-change audit data

- Named local Houses and rulers remain in place where appropriate
- Generic Neutral / NPC holdings can adopt the conquering House identity


- Updated Province / House Data Audit to match the newer political model

- The audit no longer reports a mismatch simply because one House field contains
  Neutral / NPC / Unaligned while the other contains a named local House

- This prevents expected local-House vs political-status differences from being
  reported as broken data

- The audit still flags two different named local Houses when they conflict

- Audit results now display:
  Local House
  Political Allegiance
  Controller
  Actual detected issue


- All v0.6.8 and v0.6.7 changes remain included:
  province-transfer helper repair
  diplomacy embark/disembark state repair
  persistent player political colours across regions
  fog-safe regional colours for unseen territory
  political overlay
  cleaner GM building editor
  reorganised player and GM panels

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.9.js
- styles/crown-overview-tools.css
