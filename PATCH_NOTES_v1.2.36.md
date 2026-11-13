# Crown Overview Tools v1.2.36 — Ghost Defender Fix

- Fix diplomacy ghost defenders: `isCharacterTokenOnTile` now uses the character token's physical center against province geometry, not stale `worldCharacter.currentTileId` or `worldPiece.currentTileId`.
- Explicitly assigned remote defenders can still be selected for political identity, but do not count as physically present for contested rolls.
- No existing province ownership, character action flags, or prior roll records are rewritten by installation.

**Note:** Movement logic elsewhere continues to use stored tile IDs for route planning; this hotfix targets diplomacy's physical-presence check.
