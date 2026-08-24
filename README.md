# Crown Overview Tools v0.1.5

Strategic overview map helpers for Foundry VTT.

This module is scene-gated and activates on:

- Crown of Ashes
- Crown of Ashes (Copy)

## Included in v0.1.5

- Draggable Crown Overview panel with saved position
- World date banner
- World round clock
- World piece movement reset
- World piece creation
- World path movement through linked tiles
- Route tooltip toggle
- Click Move toggle
- Automatic destination spacing when multiple world pieces occupy the same tile
- Player Build button
  - Select an owned world piece
  - Build on the tile that piece currently occupies
  - One building per player per world round
  - Maximum four buildings per tile
  - Development updates automatically from building count
  - Population rerolls when the development level changes
- Port crossing
- Tile linking and unlinking
- Tile link viewer
- Port editor
- House data editor
- CSV export/import
- Hover highlight and tooltip
- World map visibility helpers
- Safe original tile label hiding

## Build

Players can use **Build** after selecting a world piece they control. The module determines the tile occupied by that piece and offers available buildings that are not already built there.

Each player may build once per world round. The round is tracked using the World Round Clock, so initialize the clock before using the build system.

Each tile can hold a maximum of four buildings. The tile's development level is calculated from the number of completed buildings:

- 0 buildings = Ruins
- 1 building = Village
- 2 buildings = Holdfast
- 3 buildings = Town
- 4 buildings = City

## Click Move

Turn on **Click Move**, select one world piece, then click a destination tile. The module shows a confirmation dialog with route options and cost before moving the token.

If another world piece is already in the destination tile, the moved token is placed in an open nearby slot so pieces do not overlap directly.
