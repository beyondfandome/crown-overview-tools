# Crown Overview Tools v0.6.25

- Fixed Demolish Building leaving a stale building-line entry in province data.
- Demolition now rebuilds `buildingSlots` only from the surviving `builtBuildings`, so the removed line cannot be reintroduced from the old slot cache.
- Development is recalculated after the cleaned slot state is persisted.
- Retains the v0.6.24 piece-based Development/Statecraft building system and UI.
