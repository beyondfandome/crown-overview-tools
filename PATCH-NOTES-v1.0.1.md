# Crown Overview Tools v1.0.1

## Raid cleanup fix
- Raid income penalties are now consumed exactly once when the affected province is processed during the next round's economy collection.
- After that collection, raid marker/penalty fields are removed so the province no longer remains marked RAIDED.
- Cleanup also occurs when the raid penalty reduces the province's Gold/Food income to zero, fixing the stale-state edge case that previously skipped saving the cleared raid state.
- All v1.0.0 systems are retained.
