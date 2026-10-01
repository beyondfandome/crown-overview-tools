# Crown Overview Tools v1.0.8

## Drawing outline cleanup
- Fixes the ugly Foundry selection-style lines/outlines that v1.0.7 could make appear around province Drawings and their names.
- Province Highlights: Off now disables only the province Drawing root interaction needed to stop it intercepting token clicks.
- Province Highlights: On restores Foundry's original interaction state instead of forcing Drawing shapes, frames, and control icons interactive.
- Does not alter Drawing appearance, province data, or labels.

## Preserved from v1.0.7
- Assigned characters retain Foundry OWNER control for their assigned player.
- `getStrategicArmiesForBattle()` remains exposed through the module API and `CROWN_OVERVIEW_TOOLS` for Battle Army Tools.
