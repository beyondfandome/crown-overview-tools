# Crown Overview Tools v1.1.50

- Great Hall is no longer treated as a valid building; it was only a legacy rule left from the old catalog.
- GM startup migration removes obsolete Great Hall entries from province builtBuildings, buildingData, and buildingSlots.
- Active-construction locks now require the construction row to correspond to a current building-catalog entry AND to be present in builtBuildings.
- Orphan/future-dated buildingData rows from old exports no longer block construction.
- Preserves all v1.1.49 features.
