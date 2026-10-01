# Crown Overview Tools v1.1.21

## GM Province Edit Mode

- Adds **Edit Provinces / Finish Editing Provinces** to the GM Map Tools section.
- Edit Provinces makes Crown province Drawing documents visibly outlined and keeps their Foundry placeables visible, interactive, and selectable.
- The normal 100ms clean-map guard and Drawing update hooks now respect Province Edit Mode instead of suppressing the province again after the first edit.
- Province Edit Mode remains active across repeated ownership, House, economy, trade-good, port, link, and other Drawing edits until the GM explicitly finishes editing.
- Tile-name Drawings remain visible during Province Edit Mode but are made non-interactive so they do not steal clicks from province geometry.
- Province Edit Mode and Move Tile Names mode are mutually exclusive.
- Finishing Province Edit Mode releases Drawing selection, restores the validation-safe 0.001 province appearance, reapplies runtime suppression, and returns the GM to Token selection.
- Province/House/economy data is not changed by the toggle itself; only Drawing appearance and interaction state are changed.
- v1.1.20 military sustainability, v1.1.19 political memory, updater metadata, and boxed core systems are otherwise unchanged.
