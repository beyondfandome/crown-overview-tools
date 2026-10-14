# v1.1.92 — Development Income Fallback

- Fixed development income evaluation for legacy/imported provinces that record a `developmentLevel` but do not have compatible `builtBuildings`/`buildingSlots` metadata. Previously these incorrectly received the Ruins (+0 Gold/+1 Food) development bonus.
- Active building slots remain the authoritative development level for provinces with construction records, so pending buildings do not grant the income increase early.
- Development bonus remains the total at each level (not cumulative): Ruins 0G/1F; Village 3G/2F; Holdfast 4G/2F; Town 6G/1F; City 9G/-1F, before seasonal modifiers and Cursed penalties.
- No retroactive resource payouts. Collect income on the next new round to validate. Previously collected rounds cannot be safely recalculated automatically.
- Check `Economy Enabled` on any province still failing to collect income; manual or failed imports can disable collection independent of development.

Regression tests: developed legacy province with no buildings, normal completed building, pending building, seasonal multipliers, cursed income, and once-per-round income collection. Syntax/archive checks only; requires Foundry live testing.
