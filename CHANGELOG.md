## v1.1.91
- Starting-capital migration and capital/province-marriage UI consistency.
- Winter popup-only granary payment action; Main Action labels.

## v1.1.88 (test build)

See `PATCH_NOTES_v1.1.88.md` for implemented features, unchanged rules, and explicitly pending work.

## v1.1.87
- Raid plunder now 50% / 100% / 150% of positive province income.
- Neutral / Unaligned provinces cannot be raided.
- Three successful raids in one calendar year neutralize an unmarried player-controlled province.
- Married provinces remain raid-able but immune to political neutralization.
- Yearly counter resets by year and ownership; only one successful raid per province per round.
- Third raid resolves rewards and penalties before neutralization.

## v1.1.86 — Raiding overhaul (test build)
- 1×, 2×, 3× provincial Gold/Food income for partial, successful, and exceptional raids.
- Raided provinces produce no Gold or Food at next collection.
- Successful raids drain 1 Influence from controlling realm, capped at 3 total per realm per round.
- 0.5%, 1%, 2% population casualties (provisional rates).
- Raids spend linked commander Main Action but do not exhaust army movement.
- One successful raid per province per round.

## v1.1.85 — Winter provisions
- Every Winter 1 and Winter 2, player Houses must open granaries once per round: 1/2/3/4/5 Food per controlled non-sea province at Development 0/1/2/3/4.
- Winter prompt lists province-level costs and realm Food; payment is a House action, not a character Main Action.
- Server-side GM collection and per-round scene ledger prevent duplicate payment; shortfalls use existing negative Food economy.
- The Round Clock announces winter after income collection; outstanding payments remain pending until submitted, and players can reopen via Open Granaries.
- Based on v1.1.84; prior anti-stacking and round lock retained.

## v1.1.82 — Province Arrival Points
- GM scene panel: Set / Reset Province Arrival Points. Pick a province, then click within its polygon to set its arrival anchor.
- Characters, armies and fleets spawned or moved to a province use the saved anchor; default remains geometric center. Existing tokens are not relocated.
- Province connections, movement costs, and drawing geometry are unchanged.

## v1.1.81
- Shared Main Action enforcement for diplomacy, siege, construction, army muster, bank loans, and navy summon.
- Navy launch consumes and persists Main Action; pending navy musters do as well.
- GM request handlers re-check Main Action on army and navy submissions.
- Fixed stale action-key priority masking a current-round lock.
- Retains v1.1.80 round lock; no grid adjustments.

# Changelog

## 1.1.77
- Navies now have a fixed strategic Movement of 2, matching armies.
- Newly mustered fleets are created with Movement 2 regardless of commander Naval Movement.
- Existing fleet tokens are treated as Movement 2 immediately and are normalized to Movement 2 on the next movement reset.

# Crown Overview Tools Changelog

## v1.1.76
- Army muster now requires the commander to be standing in land territory controlled by their realm, enforced both in the player UI and again during GM/server-side validation.
- Navy muster no longer requires a Port. The commander must be in a controlled ship-producing province with an active Shipwright (or higher Drydock level), and the fleet launches into an adjacent sea tile.
- Navy muster origin and adjacent-sea validation is rechecked when the GM processes the request.
- Movement accounting now consistently uses effective linked commander/army movement in route tooltips, click-move confirmation, and Path Move.
- Stored `currentTileId` is now authoritative before geometry fallback when beginning movement, preventing border/overlap position drift from selecting the wrong origin province.

## v1.1.75
- Kinslayer is now a realm-wide diplomatic stain.
- Hostile diplomacy against any holding in a realm with a Kinslayer gains +2, even when another character is the physical defender.
- The GM diplomacy detail card identifies the realm-wide Kinslayer modifier and, when practical, the character responsible.
- Release package cleaned: historical patch-note files and obsolete versioned JavaScript copies are no longer shipped.

## v1.1.74
- Restored shared realm/economy helpers accidentally removed during the Out-of-Map Action refactor.
- Restored the Crown action bar while preserving the Main Action system.
- Removed stray backup files from the release package.

## v1.1.73
- Fixed diplomacy checking defender presence before the variable was initialized.

## v1.1.72
- Added separate Main Action tracking.
- Replaced Intrigue Action with Out-of-Map Action for major events not modeled directly on the strategic map.
- Out-of-Map Actions spend the Main Action but do not spend movement.
- Major-action interfaces now warn that the action will take the character's Main Action.

## v1.1.71
- Standardized Eunuch and Intrigue spelling while preserving compatibility with older imported spellings.

## v1.1.70
- Diligent/Dilligent spellings are treated as the same trait so Prepare the Way works with existing imported characters.

## 1.1.80 (local test build)
- GM round lock and automatic unlock after successful Round Clock advance.
- No grid resizing or permanent scene protection changes.

## v1.1.83
- Free-space province arrival placement searches from saved anchor outward; checks token footprints against existing tokens and province shape.
- Applied to character/army/navy creation, world-piece creation, and province movement. No changes to movement costs.
- Blocks arrival if no legal free landing position exists.

## v1.1.84
- If no collision-free landing spot exists, tokens may stack at their province arrival point instead of blocking travel. Use Spread Tokens to separate them.

## v1.1.89
- My Realm marriage coring, eligible character filtering and renewed eligibility after conquest.
- Territory-loss Influence penalties with capital precedence.

## v1.1.90 — House Events & Player Weddings
- Host Event action: feast, festival, tourney with revised costs, Main Action usage and timed rewards.
- Persistent player marriage proposals, private missives, acceptance, venue and tier selection.
- Hosted weddings with 1–3-round scheduling, world announcements, reminders, attendance and bilateral confirmation.
- Missed wedding Influence penalties and GM postponement; diplomatic alliances remain until formally dissolved.
- Marriage-allied raids/Quick Sieges warn and award Dishonorable on proceeding.
- See PATCH_NOTES_v1.1.90.md for mechanics and testing guidance.

## v1.1.92
- Correct legacy/imported development income fallback when building metadata is missing.

## v1.1.94 — GM one-click Marriage Removal
- Added Remove Marriage next to Edit Marriage in My Realm, with confirmation and no Influence/Main Action cost.
