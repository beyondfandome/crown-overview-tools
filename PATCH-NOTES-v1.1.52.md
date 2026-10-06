# Crown Overview Tools v1.1.52

- Tile-name label Drawings are now explicitly excluded from province geometry lookups. Tokens landing on top of a visible province name can no longer treat the label as a separate tile.
- Player clients no longer run the 100ms world-map visual-suppression polling loop; Drawing lifecycle hooks handle normal play instead.
- GM visual-suppression safety polling is reduced from 100ms to 1000ms.
- Province hover polling is reduced from 100ms to 250ms to lower repeated geometry scans while preserving responsive highlighting.
- Preserves all previous v1.1.51 mechanics and migrations.
