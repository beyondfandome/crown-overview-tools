# Crown Overview Tools v1.1.36

## Faith of the Seven sect split

- Adds province religion options for:
  - Warrior's Sons
  - Poor Fellows
  - Cult of the Mother
  - Cult of the Smith
  - Cult of the Crone
  - Cult of the Maiden
  - Cult of the Father
  - Cult of the Stranger
- On the first GM load after updating, approximately 30% of provinces whose religion is exactly **Faith of the Seven** are deterministically reassigned to one of these devotional sects.
- Existing **Dornish Faith of the Seven** provinces are not included in this split.
- The migration runs once per world and stores a hidden completion flag.
- Existing manually assigned sects count toward the 30% target.
- Added canonical aliases for common sect spellings.

Province religion should be read as the dominant local devotional current, not a claim that every inhabitant belongs to the named order.
