# Crown Overview Tools v0.6.12

## What v0.6.12 changes

- Fixed the GM "Repair Player Province Identity" tool skipping the exact partial-control state seen on Blackmont

- v0.6.11 only repaired provinces whose Ownership Type already said Player

- Older failed / partial takeover states could instead contain:
  Player Owner: Thom
  Ownership Type: Neutral
  Local House: Neutral
  Allegiance: Unaligned

- Because Ownership Type still said Neutral, v0.6.11 skipped those provinces even though a real player controller was already present

- v0.6.12 now treats a valid Player Owner / controller as the strongest evidence of player control

- If a province has a real player controller, the repair can now correct:
  Ownership Type → Player
  Local House → player's House when the old House is generic Neutral / NPC
  Allegiance → player's House when the old allegiance is generic Neutral / Unaligned
  Public political label → player's House

- This should repair Blackmont as well as other mixed states such as:
  Cinder's Edge
  Cider Hall
  or any other province that shows a Player Owner but still says Neutral


- Improved repair report

- Each repaired province now says which parts were corrected:
  ownership
  allegiance
  House


- Updated Province / House Data Audit

- The audit now explicitly flags:
  a province with a player controller but a Neutral / NPC ownership type

- Generic Neutral / Unaligned allegiance and generic Local House checks now run whenever a valid player controller exists,
  not only when Ownership Type already says Player


- Hardened Political Overlay

- On revealed territory, a valid Player Owner / controller now takes priority over stale Neutral ownership metadata

- This means a province showing:
  Player Owner: Thom
  but stale Ownership Type: Neutral

  will use Thom's political colour rather than grey

- Unrevealed territory still uses only its generic regional colour and does not leak exact ownership

- Truly Neutral / NPC / unowned revealed territory remains grey


- All v0.6.11 conquest behaviour remains:
  generic Neutral / NPC provinces absorbed by conquest adopt the conquering House
  named local Houses can remain distinct
  existing rulers are not automatically replaced

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.12.js
- styles/crown-overview-tools.css
