# Crown Overview Tools v0.2.0

Scene-gated strategic overview map tools for Foundry VTT.

## Included in v0.2.0

- Sticky player map vision
  - selecting one world piece shows that piece's current tile and linked tiles
  - deselecting now falls back to the combined vision of all world pieces controlled by that player
  - players should no longer see the whole map simply because no token is selected
- My Holdings button
  - players can view their assigned tiles
  - shows buildings, development, population, treasury, and exports
  - GMs can choose a player from a dropdown and inspect their holdings
- Includes v0.1.9 pending build support
  - player builds go to an active GM if online
  - if no GM is online, builds are queued as pending requests
  - GM can process pending builds later
- Includes previous tools
  - draggable overview panel
  - click-to-move
  - route tooltip
  - piece tooltip
  - build button
  - assign tile owner
  - assign piece owner
  - port crossing
  - round clock
  - CSV import/export

## Scene activation

This module activates only on scenes named:

- Crown of Ashes
- Crown of Ashes (Copy)

or scenes explicitly flagged as overview scenes.
