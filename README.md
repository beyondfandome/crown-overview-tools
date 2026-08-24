# Crown Overview Tools v0.1.6

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
- Port crossing
- Automatic spacing when multiple pieces occupy the same tile
- Tile linking and unlinking
- Tile link viewer
- Port editor
- House data editor
- CSV export/import
- Hover highlight and tooltip
- World map visibility tools
- Safe original tile text hiding
- Build button for player construction
- Assign Tile Owner button for GM player ownership

## New in v0.1.6

- Adds GM-only Assign Tile Owner button.
- GM can select one or more world tiles and assign them to a Foundry player from a dropdown.
- Assigned player ownership is stored on both the World Tile and House Data flags.
- Hover tooltip shows Player Owner when assigned.
- Build now checks that non-GM players are building on a tile assigned to their Foundry user.
- GM can still build anywhere for setup and correction.
- Assign House Data preserves existing tile owner metadata.

## Player build rules

Players can build only if:

- They control the selected world piece.
- The piece is standing on the target tile.
- The tile is assigned to their Foundry player account.
- The tile is not a sea tile.
- The tile has fewer than four buildings.
- They have not already built this world round.

GMs are not limited by tile ownership or one-build-per-round, but the four-building cap and no-sea-building rule remain in place.
