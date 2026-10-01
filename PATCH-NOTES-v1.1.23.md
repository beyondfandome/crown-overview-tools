# Crown Overview Tools v1.1.23

## Unified realm identity
- Province detail permission, Holdings, muster contribution, economy ownership, political overlay identity, and military upkeep now share the same political-control resolver.
- Recognizes current and legacy explicit controller aliases: `ownerUser*`, `playerOwnerUser*`, and `controllerPlayer*`.
- If an old stored Foundry user ID no longer resolves, a matching current player name can recover the controller relationship.
- House identity comparisons treat `Karstark`, `House Karstark`, and `House of Karstark` as the same political House.

## Neutral territory
- Explicit Neutral / Unaligned / NPC political state remains authoritative and cannot fall back to a preserved local House name.

## Preserved
- v1.1.22 neutral muster exclusion and document-safe military upkeep scan.
- v1.1.21 GM Edit Provinces toggle.
- v1.1.20 negative-upkeep Influence loss and levy over-cap attrition.
- v1.1.19 Political Intelligence Memory.
- Existing updater repository and stable manifest URLs.
