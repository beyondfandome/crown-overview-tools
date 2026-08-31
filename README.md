# Crown Overview Tools v0.3.1

Scene-gated strategic overview map tools for Crown of Ashes.

## Included in v0.3.1

- Fixes Winter economy scaling for development bonuses.
- Development Gold/Food bonuses are now affected by the seasonal income multiplier.
- This fixes the issue where Winter correctly halved trade-good Gold but left each Ruins tile's +1 Food unhalved.
- Market Forces now accepts both `0.5` and `.5` values.
- Keeps v0.3.0 trade goods, category market forces, holdings, player vision, build queue, ownership, CSV import/export, and economy tools.

## Winter example

If Winter category market forces are set to:

```text
Grains & Field Crops: 0.5, 0.5
Fruits & Orchard Crops: 0.5, 0.5
Livestock & Mounts: 0.5, 0.5
Game & Animal Products: 0.5, 0.5
Fish & Aquatic Resources: 0.5, 0.5
Metals & Ores: 0.5, 0.5
Stone & Minerals: 0.5, 0.5
Timber & Natural Materials: 0.5, 0.5
Crafted & Manufactured Goods: 0.5, 0.5
Trade & Industry: 0.5, 0.5
```

then trade-good output is halved. Development bonuses are also seasonally scaled, so Ruins +1 Food becomes +0.5 Food in Winter.

## Install

Manifest:

```text
https://raw.githubusercontent.com/beyondfandome/crown-overview-tools/main/module.json
```
