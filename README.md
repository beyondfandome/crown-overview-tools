# Crown Overview Tools v0.1.1

Scene-gated strategic overview tools for the **Crown of Ashes** and **Crown of Ashes (Copy)** scenes.

## Scene gating

This module activates only on scenes named:

- Crown of Ashes
- Crown of Ashes (Copy)

It can also be enabled manually on a scene with:

```js
await canvas.scene.setFlag("world", "overviewMapMode", true);
```

And disabled manually with:

```js
await canvas.scene.setFlag("world", "overviewMapMode", false);
```

## Included systems

- World date banner
- Round clock and movement reset
- World piece creator
- World path move with region selector
- Port crossing
- Link / unlink world tiles
- View world tile links
- Make / edit ports
- Assign house data
- Export CSV
- Import CSV
- World tile hover highlight and tooltip
- World piece visibility by current + linked tiles
- Safe hide original tile text

## Data flags used

- `world.worldTile`
- `world.worldPiece`
- `world.houseData`
- `world.worldRoundClock`
- `world.overviewMapMode`

## Important

Foundry modules load at world level, but this module is scene-gated. It should stay quiet on ordinary scenes and tactical battle scenes.



## v0.1.1

- Moves the Crown Overview panel to the right of Foundry's left-side toolbar.
- Slightly narrows the panel and buttons so it takes up less screen space.
