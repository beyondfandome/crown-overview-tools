# Crown Overview Tools v1.0.5

## Realm CSV trade-good round trip
- Realm CSV import now reads Primary/Secondary Trade Category, Gold Value, and Food Value instead of silently rebuilding all values from the catalog.
- Custom trade goods exported to CSV can be imported back with their names and values intact.
- Known catalog goods still provide fallback category/value data when CSV value cells are blank.

## Custom holding exports
- Edit Tile Ownership / House Data now exposes catalog selection plus editable trade-good name, category, Gold value, and Food value for primary and secondary exports.
- A holding can therefore rename an export (for example a local wine) and assign the agreed economic value without changing the global catalog for every holding.
- Custom trade goods participate in Market Forces using their selected category.

## Westerland Reds
- Added Westerland Reds to Livestock & Mounts at 5 Gold / 0 Food.
