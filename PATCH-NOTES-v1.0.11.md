# Crown Overview Tools v1.0.11

- Automatically suppresses rendered province Drawing geometry on Crown overview scenes without changing or deleting the underlying Drawing documents.
- Automatically hides Foundry Drawing frames/controls around movable `worldTileLabel` names while keeping the label text visible.
- Adds a GM-only **Move Tile Names** / **Finish Moving Tile Names** toggle in **GM: Map Tools & Maintenance**.
- **Move Tile Names** activates the Drawing layer so the GM can drag the separate tile-name label Drawings while province geometry remains suppressed.
- Finishing tile-name editing releases Drawing selections, restores the clean label presentation, and returns to the Token layer.
- Tile-name edit mode is temporary and starts off after a reload.
- Removes the automatic v1.0.10 stored-alpha repair on scene load; the v1.0.11 cleanup is runtime-only and avoids Foundry v14 Drawing visible-content validation.
- Keeps the manual **Repair Stored Province Appearance** maintenance action as a fallback.
- Preserves assigned-character ownership/control repair.
- Preserves `getStrategicArmiesForBattle()` and Battle Army Tools integration.
