# Crown Overview Tools v1.1.51

- Generalized the v1.1.50 Great Hall cleanup into a stale-province data scrub.
- Removes obsolete buildings that are not part of the current BUILDING_LINES catalog.
- Removes orphan `buildingData` rows whose building is not actually present in `builtBuildings` (including old future-dated test construction such as Cinderholdt Shipwright).
- Canonicalizes valid building aliases and rebuilds `buildingSlots` / Development from the current catalog.
- Retires the old pre-catalog BUILDING_RULES table so Keep/Smithy/Market/Temple/Shipyard/etc. cannot silently contribute legacy income.
- Removes legacy troop, ship, and siege quantities from province economy resource maps; those are tracked by the current military/manpower systems instead.
- Preserves all v1.1.50 mechanics and updater metadata.
