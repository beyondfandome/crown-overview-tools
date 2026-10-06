# Crown Overview Tools v1.1.31

## Realm treasury / construction fix
- Player construction now checks and spends from the player's pooled realm treasury rather than requiring the entire cost to exist on the province being developed.
- The Build dialog now shows **Realm Resources** for players.
- Bank loans and other realm credits therefore become immediately usable for construction anywhere in the realm.

## Neutral stockpile isolation
- `Neutral`, `Unaligned`, `Independent`, `NPC`, and `None` allegiances are now an absolute political veto for realm membership.
- Stale owner/controller fields can no longer make a neutral province count toward a player's holdings.
- Neutral province stockpiles are therefore excluded from realm treasury totals, spending, loans, upkeep, and other pooled-resource operations.
