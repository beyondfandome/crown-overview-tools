# Crown Overview Tools v1.2.24 — Release Candidate

## Added and fixed
- Separate ordinary levy, event-troop, and mercenary cohorts; first-round upkeep waiver follows surviving special troops through transfers and splits.
- Post-upkeep mercenary desertion checks run even for zero-upkeep houses and announce BROKIE publicly when Gold is negative. Zero Gold is permitted.
- Prevent zero-strength transfers. Existing cross-House construction approvals retained.
- Rehydrate pending army encounters from saved scene flags after GM reconnect; preserve submitted decisions and re-offer unanswered prompts.
- Hold multi-step army routes at hostile encounters, and require players to resolve encounter/battle decisions before continuing.
- Automatically roll 2 × Intrigue + 1d20 for both sides when a character enters a foreign-army/locked province, including hidden armies. On defender win or tie, the owner chooses Allow Passage / Stop Character; no popup on character victory.
- Use the commander of the largest foreign army in the tile; for an armyless lockdown, use the Intrigue of the character who imposed it. Same-House passage bypasses interception.
- Each moving character gets at most one interception outcome against a particular province each round; the defender may intercept unlimited different characters. A stopped character stays in their previous province, spends **one movement point**, and can take another route with remaining movement. Repeat attempts into that stopped province are refused without another charge.
- GM-controlled permission and character movement remain pending until the defending player answers; pending decisions are persisted to scene flags, and the player can resume a stalled request after refresh without rerolling.
- Added the **GM: Resolve Pending Interception** button (allow, stop, or cancel pending requests).
- Updated port arrivals to use the opposed Intrigue system for intercepted characters; retained the old approval system for unguarded ports.
- Non-GM direct token dragging cannot bypass strategic character or army movement rules; use Crown's movement controls.

## Test before deploying live
- Live Foundry multiplayer sequencing, switching scenes mid-decision, connection loss, and concurrent players have NOT been runtime-tested in this environment.
- Port crossings made by attached armies still follow existing army permissions rather than character Intrigue.
- Scene-flag persistence is best-effort for interrupted decision flows; a GM can resolve outstanding interceptions manually.
