# Crown Overview Tools v1.1.16

## Political Overlay hotfix

This release is a narrow hotfix on top of the boxed v1.1.15 release.

- Repairs the Political Overlay renderer for Foundry v14 by mounting its persistent graphics under `InterfaceCanvasGroup` instead of inside the interactive `DrawingsLayer`. This keeps the overlay visible while Crown's normal-play province Drawing suppression and Token-layer workflow are active.
- Player colours remain deterministic from Foundry user IDs and collision-separated across the 24-colour palette.
- Political colouring now resolves current realm control through explicit controller data, sworn-to-player data, and canonical player-House allegiance. Named local Houses remain historical/local identity and do not override the colour of the realm that politically controls them.
- Legacy provinces with correct allegiance but missing explicit controller fields can still receive the controlling player's colour.
- Neutral/NPC/revealed unowned territory remains grey. Non-GM fog-of-war behavior is preserved: unseen territory does not leak exact political ownership.
- The overlay automatically redraws when province Drawings, character Tokens, token control, or the player roster changes.
- v1.1.15 economy, military upkeep, raiding recovery, Roads/fortifications, Port travel, realm resolution, map-label suppression, and Battle Army Tools integration are otherwise retained unchanged.
