# Crown Overview Tools v1.2.35

Based on v1.2.34; unchanged: development/income calculations.

- **Joint Sieges:** Select additional same-House armies in the target province; allied Houses must pledge an individual army to the lead House for the current round before it can be selected. Shared manpower, capped engine and assault-quality bonuses, optional same-House additional commanders (+2% each up to +6%), allied linked commanders, proportional casualty allocation, one Main Action per participating commander, movement lock for every participating army. Detailed result private to participating Houses, defending owner and GMs.
- **Feast/festival/tourney event picker:** Married but action-ready characters can host events. Wedding candidate eligibility remains unmarried-only.
- **Weddings in Host Event UI:** A Wedding choice opens the existing proposals/accept/scheduling/ceremony/alliance workflow; removes redundant player button. Public successful marriage announcement remains names-only.
- **Interception cancellation:** Pending map replacement explicitly unsets the previous flag to avoid Foundry's nested merge resurrecting canceled requests. Canceled requests resolve local/remote waiters; duplicate pending requests with the same movement key are collapsed.
- **Under Dragon Attack:** GM toggle on selected province (via drawing or a token within it), visible in province hover highlights; blocks entering that tile before spending movement. Turning off returns to normal rules.

**Not changed:** premature development income. This release has static syntax validation only; test in a staging world before production. In particular test player-side joint-siege permissions and multi-army casualty distribution.
