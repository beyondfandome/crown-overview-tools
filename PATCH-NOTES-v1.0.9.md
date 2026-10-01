# Crown Overview Tools v1.0.9

- Restores the stable v1.0.0 Foundry Drawing rendering behavior.
- Removes the v1.0.7/v1.0.8 hooks and placeable mutations that could expose province Drawing frames/outlines and label boxes.
- Province Highlights Off now stops only Crown's hover/highlight overlay and activates the Token layer for character selection.
- Does not alter saved Drawing alpha, fill, stroke, shape, text, frame, control-icon, or render state.
- Preserves assigned-character ownership/control repair.
- Preserves `getStrategicArmiesForBattle()` and the Battle Army Tools live import contract.
- Army transfer remains pull-based: Battle Army Tools reads Crown's live API when the GM chooses **Import Crown Army**.
