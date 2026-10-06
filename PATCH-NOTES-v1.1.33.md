# Crown Overview Tools v1.1.33

## GM cancel pending army muster

- Adds **Cancel Pending Army Muster** to **GM: Armies, Tiles & Economy**.
- Lists every army muster still in the `pending` state.
- GM chooses the muster and confirms cancellation.
- Returns the muster's reserved manpower to the owning realm, capped by current manpower capacity.
- Cancelling the pending record immediately releases its training-capacity and siege-capacity reservations.
- Cancelled musters are marked `cancelled`, so Round Clock / fallback muster processing will not spawn them.
- The commander's spent action/movement is intentionally **not** restored.
- Cancellation confirmation is whispered to the affected player and all GMs.
