# Crown Overview Tools v1.1.26


## v1.1.26 — Player UI & Marriage Diplomacy

- Splits player controls into separate **Realm** and **Military** sections.
- Replaces separate Summon Army / Summon Navy buttons with **Summon Military**, then lets the player choose Army or Navy.
- Replaces separate Embark / Disembark buttons with **Embark / Disembark**, then lets the player choose the operation.
- **My Holdings** now has **Realm** and **Raised Armies** tabs. Raised Armies lists current armies/navies, commanders, location, strength/composition, and per-round upkeep.
- Realm shows actual current gross House income, current raised-military upkeep, and net round income using the same live economy/upkeep calculations as Round Advance.
- Diplomatic Takeover now includes a **Use Marriage Diplomacy** toggle. When enabled, Marriage Diplomacy is added to Diplomacy; a successful takeover records one of the realm's three marriage slots.
- Realm view tracks **Marriages: X / 3** and lists recorded marriage alliances. Failed Marriage Diplomacy attempts do not consume a slot.



## v1.1.25 — Persistent Political Controller Sync

- Integrates the GM test macro that successfully repaired player province-detail access.
- On the overview scene, the GM client builds a unique House → current Foundry player map from Crown character tokens and persists that controller onto provinces whose current political Allegiance matches that House.
- Writes all supported explicit controller aliases (`ownerUser*`, `playerOwnerUser*`, and `controllerPlayer*`) to both `worldTile` and `houseData`, keeping tooltip permissions, My Holdings, mustering/manpower, economy, and military upkeep on the same identity.
- `Neutral` / `Unaligned` / `Independent` / `NPC` allegiance is never auto-assigned, so neutralized provinces remain outside the former realm even when their local House name is preserved.
- Ambiguous House mappings (the same House resolving to multiple current players) are skipped instead of guessed.
- Sync runs on GM canvas load and after relevant province or character flag edits; a re-entrancy guard prevents the sync from triggering itself indefinitely.

## v1.1.24 — Political Allegiance Authority Hotfix

- Fixed provinces whose current political allegiance belongs to a player House but which still carry legacy/local `ownershipType: Neutral` or `NPC`.
- Meaningful current allegiance now outranks stale local ownership-type metadata for province-detail permissions, Holdings, mustering, economy ownership, and military-upkeep realm membership.
- Truly neutral territory remains authoritative: the GM Neutral Reset writes `Allegiance: Unaligned`, so neutralized provinces are still removed from former-House manpower and realm calculations immediately.
- Preserves the v1.1.23 unified controller aliases and House-name normalization.

## v1.1.23 — Unified Realm Identity Hotfix

- Province detail visibility now uses the same current political-control resolver as Holdings and realm systems.
- Legacy `controllerPlayerUserId` / `controllerPlayerName` province fields are recognized as explicit player control.
- Stale/deleted Foundry user IDs can fall back to a still-valid stored player name instead of incorrectly denying the current player.
- Political House names are canonicalized for realm comparisons, so `Karstark`, `House Karstark`, and `House of Karstark` resolve as the same House.
- Holdings, muster contribution, economy ownership, political overlay identity, and military upkeep use the unified resolver.
- Deliberately Neutral / Unaligned provinces remain excluded even when their preserved local House name matches a former player House.

## v1.1.22 — Realm Control / Muster / Upkeep Hotfix

- Player-facing province detail permissions now use the same political-control rules as Holdings: explicit controller, sworn-to-player, then current House allegiance. A player can see full House/economy/building data for every province their realm currently controls.
- **Neutral / Unaligned is authoritative.** A province made neutral keeps its local House identity for lore, but no longer falls back into that former House's Holdings, manpower, levy, training, siege, or ship-capacity pools.
- Player build/demolish permission checks now use current realm control rather than only legacy explicit owner fields.
- Military upkeep scans both rendered token placeables and Scene TokenDocuments, so an army that finishes mustering during Round Advance cannot miss upkeep merely because Foundry has not rendered its token placeable yet. Legacy `forceType` and `navy` records are also recognized.
- Over-cap attrition uses the same document-safe active-army scan, so newly mustered armies participate in the levy check immediately.


**GM province editing hotfix on the boxed Crown of Ashes release.**

v1.1.21 adds a persistent-in-session **Edit Provinces / Finish Editing Provinces** GM toggle. While enabled, Crown keeps province Drawing geometry visible and selectable across repeated Drawing/House/Economy edits instead of immediately re-suppressing it after the first update. Tile-name labels stay visible but do not steal province clicks. Finishing edit mode restores the clean map and validation-safe near-transparent stored province appearance.

The canonical loaded script is `scripts/crown-overview-tools.js`.

v1.1.20 military sustainability and round-edge hardening remains intact.

v1.1.20 keeps the v1.1.19 political-intelligence system intact and adds the campaign sustainability loop: military upkeep may drive Gold/Food negative; a realm that remains negative after military upkeep loses 1 Influence that round; Influence below 7 now follows the Guidebook's exact -10% levy capacity per point; and fielded armies above the resulting realm levy cap suffer 5% attrition per round, capped at the actual overage and distributed proportionally across the realm's armies. It also stamps zero-income provinces as collected, makes overdue trade shipments safely retry instead of aborting Round Advance, and allows legacy pending navy musters to complete through the Round Clock.
 v1.1.19 keeps the once-per-strategic-round political snapshot from v1.1.18, but adds per-player last-known political intelligence. Current visible provinces show the round snapshot at full overlay strength; provinces a player has previously seen remain as a faded last-known owner when they leave vision; never-seen provinces reveal nothing.

Political memory is stored on the viewing Foundry User, not on provinces or Houses, and never changes authoritative ownership, visibility, movement, economy, or military state. Seeing a province updates only that player's remembered record and that one remembered province graphic; it does not rebuild the political map.

For the current patch, see `PATCH-NOTES-v1.1.26.md`; the persistent controller hotfix is in `PATCH-NOTES-v1.1.25.md`; the political-allegiance authority hotfix is in `PATCH-NOTES-v1.1.24.md`; the unified realm-identity hotfix is in `PATCH-NOTES-v1.1.23.md`; the previous realm-control hotfix is in `PATCH-NOTES-v1.1.22.md`; province edit mode is in `PATCH-NOTES-v1.1.21.md`; military sustainability is in `PATCH-NOTES-v1.1.20.md`; political intelligence memory is in `PATCH-NOTES-v1.1.19.md`; the round-snapshot performance repair is in `PATCH-NOTES-v1.1.18.md`, strict fog hardening is in `PATCH-NOTES-v1.1.17.md`, the Foundry v14 renderer repair in `PATCH-NOTES-v1.1.16.md`, and the boxed baseline audit in `PATCH-NOTES-v1.1.15.md`. Historical patch notes remain for regression archaeology.

---

# Historical notes — v0.6.14

## What v0.6.14 changes

- Reworked military upkeep to use a House-wide Realm Stockpile

- Armies and navies no longer charge their entire upkeep to one arbitrary province

- Previously the module:
  totalled a player's military upkeep
  found the first controlled economy tile
  deducted the entire bill from that one province

- This is why messages could say things such as:
  "Thom: -Gold 13.5; Food 14.5 from Wyl"

- Wyl was not actually responsible for those armies
- It was simply the first qualifying controlled tile found by the module


- Military upkeep is now treated as a realm-level cost

- All controlled land-province stockpiles are treated as one logical:
  Realm Stockpile

- The player's total Gold / Food across their holdings is the military treasury

- Army and navy upkeep is deducted from that combined realm balance

- The economy message now says:
  from Realm Stockpile
  rather than naming an arbitrary province


- Upkeep debits are distributed across the realm balances

- When the realm can afford the bill, the deduction is spread proportionally
  across provinces according to the resources currently held there

- This avoids randomly draining Wyl, Cinderholdt, Blackmont, or whichever
  province happens to appear first internally

- If the total realm cannot afford the full upkeep, the available resources
  are exhausted first and the remaining shortfall is distributed across the
  realm rather than placing the entire deficit on one arbitrary province

- This preserves the existing rule that military upkeep is always charged
  while making the accounting House-wide


- Military Upkeep reports now show:

  Total Upkeep
  Realm Stockpile before payment
  Realm Stockpile after payment
  individual army / navy upkeep lines

- Example:

  Thom: -Gold 13.5; Food 14.5 from Realm Stockpile
  Realm: Gold 1,006; Food 967.5 → Gold 992.5; Food 953
  Alester's Host: Gold 10; Food 12
  Grand Maester Thomore's Host: Gold 3.5; Food 2.5


- My Holdings terminology has been updated

- The top summary card now says:
  Realm Stockpile

- "Total Stockpile" now says:
  Total Realm Stockpile

- Individual province stockpiles are still shown in the table because
  construction and local economy data continue to use province records


- Why this is implemented as one logical realm pool rather than creating a second duplicated bank

- The existing campaign already stores Gold / Food inside each province

- Creating a second independent Realm Treasury would duplicate those same resources
  and require a risky migration of every existing campaign balance

- v0.6.14 therefore treats the aggregate of all controlled province balances
  as the authoritative Realm Stockpile for military costs

- From the player's point of view it behaves as one House treasury
- Internally the existing province records remain the backing ledger

- This keeps all existing campaign resources intact while giving military upkeep
  the realm-wide behaviour intended by the rules


- Building and province-specific economy spending are NOT changed in this update

- This update only changes army / navy military upkeep

- All v0.6.13 and earlier gameplay systems remain included

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.14.js
- styles/crown-overview-tools.css
