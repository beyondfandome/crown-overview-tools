# Crown Overview Tools v1.0.15

## Dynamic player-House resource adjustment

- **Adjust House Gold / Food** no longer depends only on provinces carrying explicit player-owner fields.
- The GM list is rebuilt from live world data every time the tool opens.
- Player realms can be discovered from explicit province controller data, assigned character House identity, sworn-to-player data, and political allegiance.
- Explicit province ownership remains authoritative when records conflict, preventing a preserved local House name from assigning a conquered province to the wrong resource pool.
- The selected realm is resolved again when **Apply Adjustment** is pressed so the operation does not use stale holdings if ownership changes while the dialog is open.
- The dropdown shows the current Gold/Food stockpile and number of resolved land holdings for each player House.
- Truly unassigned non-GM accounts are omitted; assigned player Houses remain listed even if their province controller metadata still needs repair.

## Retained

- v1.0.14 Road and hostile Fortification movement modifiers.
- v1.0.13 regression restorations and mustering fixes.
- v1.0.12 economy restoration.
- v1.0.11 clean-map / movable-name tools.
