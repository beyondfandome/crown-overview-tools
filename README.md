# Crown Overview Tools v0.2.3

Strategic overview map tools for Crown of Ashes.

## Included in v0.2.3

- Adds GM-only **Repair Build Locks**.
- Hard-clears the scene build ledger, pending build requests, and world-piece build locks without deleting buildings from tiles.
- Improves **Reset Build Uses** so it clears build records by user ID, player name, builder/requester IDs, and legacy pending-build fields.
- Reset Build Uses now reports ledger entries, pending requests, and world pieces unlocked.
- Keeps v0.2.1 features: stricter player vision, My Holdings, Edit World Piece, player build ownership checks, pending build support, piece tooltip positioning, and Foundry v14 compatibility metadata.

## Overview scenes

This module activates on:

- Crown of Ashes
- Crown of Ashes (Copy)

## Build lock recovery

If a player is stuck with “already built this turn” during testing:

1. Log in as GM.
2. Open the Crown overview scene.
3. Click **Repair Build Locks**.
4. Confirm.

This does not remove existing buildings from holdings.


## v0.2.3

- Fixes the Repair Build Locks button so it actually opens/runs from the Crown Overview panel.
- Keeps hard build-lock clearing for stuck player build ledgers, pending build requests, and world-piece build flags.
