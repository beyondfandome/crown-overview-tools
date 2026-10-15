# Crown Overview Tools v1.1.95 — Marriage and Arrival Fixes

- GM My Realm Marriage/Edit Marriage selects a character controlled by the viewed House rather than another player.
- Assigning or removing a province marriage updates the protection flags and the matching marriage ledger, freeing the previously assigned character on removal. No Main Action, roll, or Influence change for GM corrections.
- Married entries show the associated character name when available.
- Movement arrival placement now uses the exact province arrival anchor, centered for the moving token, and allows stacking instead of searching across the province.
- Does not change movement costs, provincial ownership or economy.

## Test in Foundry
1. GM My Realm: assign a character, reload, remove the marriage, reload, and check Attempt Marriage visibility.
2. Confirm active marriage ledgers and the 3-marriage limit behave correctly.
3. Move character and army into Highgarden and Cobblecove from different origins.
4. Test overlap and crowded province stacking.

Static syntax validation only; live Foundry testing needed. Back up world first.
