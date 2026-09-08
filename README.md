# Crown Overview Tools v0.6.13

## What v0.6.13 changes

- Reworked Army Muster so normal player mustering no longer requires manual GM approval

- The Summon Army button now uses:
  Begin Muster
  instead of:
  Request Muster

- The player-facing text no longer tells players that the GM must manually process the army

- Raising an army still takes 1 round

- When Begin Muster is used, the module immediately validates:
  Command Capacity
  available House Manpower
  trained troop capacity
  Siege Capacity

- Manpower and specialist capacity are reserved as soon as the muster begins

- The player is shown the army's Ready date immediately


- Army musters now complete automatically through the Round Clock

- When the GM advances to a new round, the module checks all pending army musters

- Any army whose Ready date has arrived is automatically spawned

- The GM does NOT need to press a separate Process Military Musters button during normal play

- Newly completed armies are created before the new round's economy collection

- This means the army is active in the new round and begins paying its normal military upkeep immediately

- Movement is then reset normally for the new round


- Foundry permission handling is now hidden from the gameplay flow

- A player client still uses the active GM client as the privileged backend for:
  reserving shared realm manpower
  saving the pending muster
  creating the future Actor/token

- This is automatic and does not represent a GM approval step

- The player receives:
  Muster begun
  Ready date
  Muster complete
  notifications without requiring the GM to approve anything

- If no GM client is connected, the module explains that an active GM connection is required for the privileged Foundry operations


- Muster messages were cleaned up

- "Army Muster Requested" is now:
  Army Muster Begun

- The confirmation explains that:
  manpower is reserved immediately
  specialist capacity is reserved immediately
  no GM approval is required
  the Round Clock completes the muster automatically

- When the army finishes:
  Army Muster Complete
  is sent to the owning player / GM


- The Round Clock report now includes:
  Army Musters Completed
  Army musters still preparing
  failed musters, if any


- The old manual GM processor remains only as a fallback / testing tool

- The GM panel button is now labelled:
  Process Muster Fallback

- Manual fallback processing can still be used to recover or test legacy pending musters


- Navy behaviour is unchanged

- Summon Navy still launches immediately from a valid Port
- The active GM client may still perform the privileged token-creation work silently in the background


- All v0.6.12 and earlier systems remain included

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.13.js
- styles/crown-overview-tools.css
