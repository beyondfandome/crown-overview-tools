# Crown Overview Tools v1.1.98 — Test Build

## Province marriage coring (GM)
- In My Realm choose a player House, Marriage on a non-capital holding, then one eligible character belonging to that House.
- GM assignment marks the territory Married and creates an active ledger record consuming one of the House's three marriage slots.
- GM cannot assign a fourth marriage. Editing the current holding changes the character without consuming an additional slot. Removing the marriage ends its ledger record and frees the slot.
- GM assignment uses no Main Action, roll or Influence; normal player marriage coring continues using character Main Actions and diplomacy rolls.
- Character matching now checks the same controller identity used in character management, including legacy owner IDs, names and House labels. If no eligible characters are available, dialog explains this.

## Arrival spread
- Retains authoritative saved province arrival point, normal Crown movement updates and animation.
- Searches collision-free candidate positions in increasing bounded rings (up to eight local token strides), validating each against the *destination* geometry where that geometry is usable.
- Does not choose an alternate province because the anchor is full. In an extremely full/tiny holding, it stacks at the authoritative anchor as fallback.

## Validation
- Syntax / archive integrity only; Foundry multiplayer and actual map-geometry tests are still required.
- Disable any previously installed arrival-correction test hook and refresh all clients before testing.
