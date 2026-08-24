# Crown Overview Tools v0.1.8

Scene-gated strategic overview map tools for the Crown of Ashes campaign map.

## Active scenes

This module activates on:

- Crown of Ashes
- Crown of Ashes (Copy)

It stays quiet on normal battle scenes.

## Included

- Draggable Crown Overview panel
- World date banner
- World round clock
- World piece creation
- World path movement
- Click-to-move movement with confirmation
- Route tooltip comparing land, sea/port, and default routes
- World piece hover tooltip
- Port crossing
- Automatic spacing when multiple pieces occupy the same tile
- Tile linking and unlinking
- Tile link viewer
- Port editor
- House data editor
- CSV export/import
- Hover highlight and tile tooltip
- World map visibility tools
- Safe original tile text hiding
- Build button for player construction
- Assign Tile Owner button for GM player ownership
- Assign Piece Owner button for GM piece/token ownership

## New in v0.1.8

- Player Build requests now route through the active GM client by module socket.
- This fixes Trusted Player permission errors when building updates House Data on a Drawing.
- Adds GM-only Reset Build Uses button.
- Reset Build Uses can clear the current round build ledger or all build ledger data.
- Reset Build Uses can also clear the world-piece build lock, useful after admin testing or manually deleting buildings.

## Player build rules

Players can build only if:

- They control the selected world piece.
- The piece is standing on the target tile.
- The tile is assigned to their Foundry player account.
- The tile is not a sea tile.
- The tile has fewer than four buildings.
- They have not already built this world round.

Player builds are submitted to the active GM client for the actual Drawing/House Data update. The GM must be logged in and on the same Crown overview scene.

GMs are not limited by tile ownership or one-build-per-round, but the four-building cap and no-sea-building rule remain in place.
