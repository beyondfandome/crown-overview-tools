# Crown Overview Tools v1.1.59

- Player-owned/controlled world pieces remain visible to their owner even when positioned exactly on a province boundary.
- Reveal calculations now prefer the piece's stored `currentTileId` before falling back to point-in-polygon geometry.
- Prevents border rounding from briefly resolving a character into no tile or the wrong neighboring tile.
- Preserves all v1.1.58 cleanup and visibility rules.
