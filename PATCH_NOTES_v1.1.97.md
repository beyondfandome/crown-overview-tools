# Crown Overview Tools v1.1.97 — Movement and GM Marriage Test Fix

- Reworks the shared destination placement helper to use the destination drawing's saved `worldTile.arrivalPoint` directly.
- Attempts a bounded two-ring search near that anchor for free positions, and stacks on the anchor when no nearby position is available. No wide-area placement search.
- Retains the normal single animated token movement operation; no after-move snapping hooks.
- GM province Marriage picker also matches characters by their stored House/faction when legacy user ownership fields are missing. Only eligible unmarried characters from the viewed House are shown.
- Reuses existing assign/remove marriage and ledger update paths.
- Updates version metadata and the hardcoded module label.

**Test limitations:** Syntax and archive checks only. Movement, dragging, overlapping drawings, and legacy character ownership must be tested in Foundry. Disable any earlier temporary updateToken arrival-correction hook by refreshing the Foundry page before testing.
