# Crown Overview Tools v0.6.11

## What v0.6.11 changes

- Finalised the conquest behaviour for generic Neutral / NPC provinces

- When a player takes a generic Neutral / NPC province by Diplomacy or Siege,
  the province now adopts the conquering House as BOTH:
  its Local House
  its Political Allegiance

- Example after Greenflame conquers a generic Neutral province:
  Player Owner: Thom
  House: Greenflame
  Allegiance: Greenflame

- My Holdings will therefore match established holdings such as Cinderholdt:
  Greenflame
  Ruler: [existing ruler]
  Allegiance: Greenflame

- The old extra line:
  Local House: Neutral
  will no longer remain on an absorbed generic Neutral province


- Generic Neutral / NPC conquest now normalises the relevant identity fields together

- World Tile owner
- World Tile House
- World Tile local House
- House Data House
- Political allegiance
- Public owner label
- Player controller
- Ownership type

- This prevents mixed states such as:
  Player Owner: Thom
  Local House: Neutral
  Allegiance: Greenflame


- Existing NAMED local Houses are still preserved

- This change only replaces generic identities such as:
  Neutral
  NPC
  Unaligned
  Unassigned
  blank

- A province with a genuine named local House can still retain that local identity
  while changing political allegiance / player controller


- Updated the GM repair tool

- "Repair Player Allegiances" is now:
  Repair Player Province Identity

- The repair now fixes BOTH:
  generic Neutral / Unaligned political allegiance
  generic Neutral / NPC local House identity

- This means provinces already affected by older versions can be corrected
  without conquering them again


- Updated Province / House Data Audit

- Player-owned provinces with a generic Neutral local House are now flagged
- Where possible the audit shows the player's expected House
- The repair action can correct those records


- Political Overlay clarification

- Revealed player territory is primarily coloured from its Player Owner / controller
  and Player ownership state

- Local House text by itself is not what chooses the player's overlay colour

- v0.6.11 keeps ownership, House and allegiance data aligned anyway,
  so My Holdings, the tooltip, diplomacy and the political map all agree


- Religion / culture normalisation is intentionally not changed in v0.6.11
- That can be handled as a separate pass after the conquest ownership data is stable

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.11.js
- styles/crown-overview-tools.css
