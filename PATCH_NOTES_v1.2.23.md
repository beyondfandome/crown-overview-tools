# Crown Overview Tools v1.2.23 — Army Logistics, Encounters, and Mercenaries

Built on the complete v1.2.22 module. **Test in a copied Foundry world before live play.**

## Preserved from v1.2.22
- Cross-House construction proposals: builder contributes Gold, target House approves and pays the remainder.
- Province lockdown, visitor inspection, private school/trade notifications, and existing Crown buttons.

## New army tools
- Player **Manage Army / Transfer / Split** panel and GM equivalents. Transfer full command to a free same-House commander present in the province; move soldiers by unit and category between two same-House armies on the same tile; split an army roughly in half to an eligible free commander in that tile. No Main Action or muster-pool charge.
- Troops tracked separately as **levy, event, mercenary**, including when moved or split. Legacy numeric `eventTroops` and `mercenaryTroops` flags are recognized.
- GM **Spawn GM Event / Mercenary Troops**: select a commander character. If they already command an army in that province, troops join it; otherwise a new army is created and linked to that commander.
- Special troops are not counted against levy-cap attrition. Upkeep uses normal Gold/Food rates and begins in the **next** strategic round (including when the army splits/transfers before that).
- If the House Gold total is negative after military upkeep, all its mercenary cohorts desert, leaving ordinary and event troops untouched. A public **BROKIE** chat announcement reports losses.
- GM **Army Audit** reports House army counts, ordinary levy/cap, available muster manpower, exempt event troops, mercenaries, total per-round upkeep, and inconsistent records/links.

## Encounters and retreat
- GM detects different-House army co-occupancy when an army world tile is updated, offers both online controllers an allied/neutral determination, then separate battle Yes/No prompts if either declares hostility. Strength is rounded to nearest thousand; under 500 displays “fewer than 1,000.”
- Both engage => battle announcement and GM battle-lock; both decline => arriving force chooses a friendly/neutral adjacent fallback; split decisions => opposed `2 × Martial + 1d20` (ties to pursuer). Failed fallback forces battle and drains retreating army movement. Successful fallback lets retreating player choose an accessible adjacent friendly/neutral province. No eligible destination means battle is forced.
- Retreating with insufficient movement for the destination incurs **5% surviving-force exhaustion casualties once**, including special troops.
- Movement route checks stop on pending encounter / battle flags. GM **Release Armies After Battle** lifts battle locks after manual battle resolution.
- Only one prompt per pair in the same province until an army leaves and returns. Online players and an active GM on the overview scene are needed.

## Other patch
- Raiding: all-cavalry armies earn **2× loot**; mixed armies get proportional benefit (1× all foot, 2× all cavalry).
- Strategic army export to Battle Army Tools now includes the linked general’s Martial, Command Points base, and Traits.

## Validation and limitations
- JavaScript syntax checked using Node.js and isolated troop-accounting tests passed.
- Not tested in a real, multi-user Foundry world. Back up the world. Test encounter prompts, interrupted/refreshing clients, movement and ownership synchronization, special troops spanning round boundaries, and negative-Gold desertion before live release.
- Encounter state lives in the active GM client. An active pending encounter can be lost on a GM reload; GM should resolve affected armies manually after reconnecting.
- Existing actors with unknown/manual mercenary metadata may need GM Army Audit and normalization; only the documented cohort/legacy fields can be inferred.
- Battle resolution remains in the dedicated Battle Army Tools scene, and the GM manually releases battle locks after it is resolved.
