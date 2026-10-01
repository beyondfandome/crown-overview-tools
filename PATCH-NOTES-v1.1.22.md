# Crown Overview Tools v1.1.22

## Realm control consistency
- Full player province details now follow current political control, including sworn-to-player and allegiance-controlled provinces.
- Build and demolition permissions use the same resolver.
- Neutral / Unaligned provinces are explicitly excluded from former-player realm pools even when their local House name is preserved.
- A player-assigned character with zero holdings now correctly has zero contributing provinces instead of falling back to its historical/local House name.

## Mustering
- Neutralized provinces immediately stop contributing manpower, levy cap, training, siege capacity, and ship fielding capacity to their former player realm.

## Military upkeep
- Automatic upkeep now scans Scene TokenDocuments in addition to rendered token placeables. This closes the Round Advance race where a newly completed muster existed in world data but had not yet appeared in `canvas.tokens.placeables`.
- Legacy `forceType` army/fleet records and `navy` records are recognized by upkeep.
- Levy over-cap attrition uses the same document-safe army scan.

## Preserved
- v1.1.21 GM Edit Provinces toggle.
- v1.1.20 negative-upkeep Influence loss and levy attrition.
- v1.1.19 Political Intelligence Memory.
- Existing updater repository and stable manifest URLs.
